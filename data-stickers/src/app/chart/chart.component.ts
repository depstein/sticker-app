import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';
import { environment } from './../../environments/environment';
import * as moment from 'moment';
import { SAMPLE_DATA } from './sample-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('overlay', { static: true }) overlay: ElementRef<HTMLCanvasElement>;
  loaded: boolean;
  timeChart: any;
  segControlValue: string;
  chartData: object[];
  knobValues: object;
  selectedTimeRange: object;

  @Input() dataValue: number;
  @Output() dataValueChanged = new EventEmitter<number>(true);

  constructor(
    private platform: Platform,
    private health: Health,
    public global: GlobalDataService
  ) {
    this.loaded = false;
    this.segControlValue = "day";
    this.chartData = [];
    this.knobValues = {
      lower: 0,
      upper: 0
    };
    this.selectedTimeRange = {
      start: "",
      end: ""
    }
  }

  ngOnInit() {
    if (environment.usingHealthData) {
      this.setup();
    }
    else {
      this.updateChartData(SAMPLE_DATA[this.global.stickerInfo.domain][this.segControlValue]);
      this.updateChart(false);
    }
  }

  setup() {
    this.health.isAvailable()
    .then(() => {
      this.health.requestAuthorization([{
          read: ['steps', 'heart_rate', 'calories']
      }])
      .then(() => {
        this.updateChartFromHealthData(false);
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  updateChartFromHealthData(chartAlreadyGenerated: boolean) {
    this.queryHealthData()
    .then((res) => {
      let data = this.createTimeObjectArray(res);
      this.updateChartData(data);
      this.updateChart(chartAlreadyGenerated);
    })
    .catch((e) => {
      console.log(e)
    });
  }

  async queryHealthData() {
    const numBucketsPerUnit = {day: 24, week: 7, month: 30};
    const numBuckets = numBucketsPerUnit[this.segControlValue];

    const bucketPerUnit = {day: "hour", week: "day", month: "day"};
    const bucket = bucketPerUnit[this.segControlValue];

    const startDate = moment().subtract({[`${bucket}s`]: numBuckets - 1}).startOf(bucket);

    const domainToDataType = {steps: "steps", heartbeat: "heart_rate", calories: "calories"};
    const dataType = domainToDataType[this.global.stickerInfo.domain];

    if (dataType == "heart_rate") {
      return new Promise((resolve, reject) => {
        this.health.query({
          startDate: startDate.toDate(),
          endDate: new Date(), // now
          dataType: dataType,
          limit: 50000,
          ascending: true
        })
        .then((res) => {
          debugger;
          let result = new Array(numBuckets);

          for (var i = 0; i < numBuckets; i++) {
            result[i] = {
              startDate: startDate.clone().add({[`${bucket}s`]: i}).toDate(),
              value: 0,
              count: 0
            };
          }

          res.forEach(element => {
            const timeOffset = moment(element.startDate).diff(startDate, <moment.unitOfTime.DurationConstructor>`${bucket}s`);
            result[timeOffset].value += element.value;
            result[timeOffset].count++;
          });

          result.forEach(element => {
            element.value = element.count > 0 ? Math.round(element.value / element.count) : 0;
          });

          console.log(`Result: ${result}`);
          resolve(result);
        });
      });
    }
    else {
      return this.health.queryAggregated({
        startDate: startDate.toDate(),
        endDate: new Date(), // now
        dataType: dataType,
        bucket: bucket
      });
    }

  }

  updateChart(chartAlreadyGenerated: boolean) {
    if (chartAlreadyGenerated) {
      this.timeChart.data.datasets[0].data = this.chartData;
      if (this.global.stickerInfo.domain == 'heartbeat') {
        this.timeChart.data.datasets[0].borderColor = this.createColorArray();
      } else {
        this.timeChart.data.datasets[0].backgroundColor = this.createColorArray();
      }
      this.timeChart.update();
    }
    else {
      this.timeChart = new Chart("myChart", this.chartProperties(this.chartData));
    }
    this.loaded = true;
    this.redrawOverlay();
  }

  chartProperties(data: any[]) {
    const chartType = this.global.stickerInfo.domain == 'heartbeat' ? 'line' : 'bar';
    const colorType = this.global.stickerInfo.domain == 'heartbeat' ? 'borderColor' : 'backgroundColor';
    return {
      type: chartType,
      data: {
        datasets: [{
          data: data,
          [colorType]: this.createColorArray()
        }],
      },
      options: {
        animation: {
          duration: 0
        },
        layout: {
          padding: {
            right: 20
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            afterFit: function(scaleInstance) {
              scaleInstance.height = 50;
            },
            type: 'time',
            offset: true,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            afterFit: function(scaleInstance) {
              scaleInstance.width = 50;
            }
          }]
        }
      }
    };
  }

  createColorArray() {
    const baseColor = this.global.domain_info[this.global.stickerInfo.domain]['color'];
    const fadedColor = this.createFadedColor(baseColor, 0.3);
    let colorArray = [];
    for(let i = 0; i < this.knobValues['lower']; i++) {
      colorArray.push(fadedColor);
    }
    for (let i = this.knobValues['lower']; i < this.knobValues['upper']; i++) {
      colorArray.push(baseColor);
    }
    for (let i = this.knobValues['upper']; i < this.chartData.length; i++) {
      colorArray.push(fadedColor);
    }
    return colorArray;
  }

  createFadedColor(baseColor, a) {
    const r = "0x" + baseColor[1] + baseColor[2];
    const g = "0x" + baseColor[3] + baseColor[4];
    const b = "0x" + baseColor[5] + baseColor[6];
    return "rgba("+ +r + "," + +g + "," + +b + "," + +a + ")";
  }

  redrawOverlay() {
    const width = this.platform.width() - 50 - 20;
    const height = (this.platform.width() / 1.25) - 7 - 50;
    var ctx: CanvasRenderingContext2D = this.overlay.nativeElement.getContext('2d');
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(128, 128, 128, 0.1)";
    ctx.fillRect(0, 0, width * (this.knobValues['lower'] / this.chartData.length), height);
    ctx.fillRect(width * (this.knobValues['upper'] / this.chartData.length), 0, width, height);
  }

  segmentChanged(ev: any) {
    this.segControlValue = ev.detail.value;
    if (environment.usingHealthData) {
      this.updateChartFromHealthData(true);
    }
    else {
      this.updateChartData(SAMPLE_DATA[this.global.stickerInfo.domain][this.segControlValue]);
      this.updateChart(true);
    }
  }

  updateChartData(chartData: object[]) {
    this.chartData = chartData;
    this.knobValues['lower'] = Math.round(this.chartData.length * 0.25);
    this.knobValues['upper'] = Math.round(this.chartData.length * 0.75);
    this.updateDataInfo();
  }

  getNumberOfTicks() {
    return this.chartData.length;
  }

  rangeSliderChanged() {
    this.updateDataInfo();
    this.updateChart(true);
    // if (this.global.stickerInfo.domain == 'heartbeat') {
    //   this.timeChart.data.datasets[0].borderColor = this.createColorArray();
    // } else {
    //   this.timeChart.data.datasets[0].backgroundColor = this.createColorArray();
    // }
    // this.redrawOverlay();
    // this.timeChart.update();
  }

  updateDataInfo() {
    this.updateSelectedTimeRange();
    this.updateDataValue();
  }

  updateSelectedTimeRange() {
    const buckets = {day: "hours", week: "days", month: "days"}
    const formatStrings: object = {hours: "hA", days: "MMM D"}

    const initialMoment = moment(this.chartData[0]['t']);
    const moments = {
      start: initialMoment.clone().add(this.knobValues['lower'], buckets[this.segControlValue]),
      end: initialMoment.clone().add(this.knobValues['upper'], buckets[this.segControlValue]),
    }

    for (const moment in moments) {
      this.selectedTimeRange[moment] = moments[moment].format(formatStrings[buckets[this.segControlValue]]);
    }
  }

  updateDataValue() {
    let value = 0;
    let count = 0;
    for (var i = this.knobValues['lower']; i < this.knobValues['upper']; i++) {
      if (this.chartData[i]['y'] != 0) {
        value += this.chartData[i]['y'];
        count++;
      }
    }
    if (count != 0) {
      if (this.global.stickerInfo.domain == 'heartbeat') {
        const average = Math.round(((value / count) + Number.EPSILON) * 10) / 10;
        this.dataValueChanged.emit(average);
      }
      else {
        this.dataValueChanged.emit(value);
      }
    }
    else {
      this.dataValueChanged.emit(0);
    }

  }

  createTimeObjectArray(res) {
    return res.map(function(value) {
      return {
        t: value.startDate,
        y: Math.round(Number(value.value))
      };
    });
  }

}
