import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';
import * as moment from 'moment';

const USING_HEALTH_DATA: boolean = true;

const SAMPLE_DATA: object = {
  day: [{"t":"2020-08-14T03:00:00.000Z","y":5887},{"t":"2020-08-14T04:00:00.000Z","y":93},{"t":"2020-08-14T05:00:00.000Z","y":23},{"t":"2020-08-14T06:00:00.000Z","y":18},{"t":"2020-08-14T07:00:00.000Z","y":7},{"t":"2020-08-14T08:00:00.000Z","y":0},{"t":"2020-08-14T09:00:00.000Z","y":0},{"t":"2020-08-14T10:00:00.000Z","y":0},{"t":"2020-08-14T11:00:00.000Z","y":0},{"t":"2020-08-14T12:00:00.000Z","y":0},{"t":"2020-08-14T13:00:00.000Z","y":25},{"t":"2020-08-14T14:00:00.000Z","y":1002},{"t":"2020-08-14T15:00:00.000Z","y":8283},{"t":"2020-08-14T16:00:00.000Z","y":68},{"t":"2020-08-14T17:00:00.000Z","y":235},{"t":"2020-08-14T18:00:00.000Z","y":641},{"t":"2020-08-14T19:00:00.000Z","y":0},{"t":"2020-08-14T20:00:00.000Z","y":98},{"t":"2020-08-14T21:00:00.000Z","y":0},{"t":"2020-08-14T22:00:00.000Z","y":0},{"t":"2020-08-14T23:00:00.000Z","y":0},{"t":"2020-08-15T00:00:00.000Z","y":0},{"t":"2020-08-15T01:00:00.000Z","y":0},{"t":"2020-08-15T02:00:00.000Z","y":0},{"t":"2020-08-15T03:00:00.000Z","y":0}],
  week: [{"t":"2020-08-07T07:00:00.000Z","y":15226},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10382}],
  month: [{"t":"2020-07-15T07:00:00.000Z","y":4953},{"t":"2020-07-16T07:00:00.000Z","y":3752},{"t":"2020-07-17T07:00:00.000Z","y":5926},{"t":"2020-07-18T07:00:00.000Z","y":6311},{"t":"2020-07-19T07:00:00.000Z","y":10222},{"t":"2020-07-20T07:00:00.000Z","y":9380},{"t":"2020-07-21T07:00:00.000Z","y":10143},{"t":"2020-07-22T07:00:00.000Z","y":15724},{"t":"2020-07-23T07:00:00.000Z","y":10937},{"t":"2020-07-24T07:00:00.000Z","y":13556},{"t":"2020-07-25T07:00:00.000Z","y":871},{"t":"2020-07-26T07:00:00.000Z","y":1584},{"t":"2020-07-27T07:00:00.000Z","y":8262},{"t":"2020-07-28T07:00:00.000Z","y":8741},{"t":"2020-07-29T07:00:00.000Z","y":1282},{"t":"2020-07-30T07:00:00.000Z","y":1561},{"t":"2020-07-31T07:00:00.000Z","y":9786},{"t":"2020-08-01T07:00:00.000Z","y":5303},{"t":"2020-08-02T07:00:00.000Z","y":8640},{"t":"2020-08-03T07:00:00.000Z","y":10272},{"t":"2020-08-04T07:00:00.000Z","y":7076},{"t":"2020-08-05T07:00:00.000Z","y":1243},{"t":"2020-08-06T07:00:00.000Z","y":496},{"t":"2020-08-07T07:00:00.000Z","y":15226},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10382}]
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('overlay', { static: true }) overlay: ElementRef<HTMLCanvasElement>;
  loaded: boolean;
  timeChart: any;
  segmentedControlValue: string;
  chartData: object[];
  knobValues: object;
  selectedTimeRange: object;

  @Input() dataSum: number;
  @Output() dataSumChanged = new EventEmitter<number>(true);

  constructor(
    private platform: Platform,
    private health: Health,
    public global: GlobalDataService
  ) {
    this.loaded = false;
    this.segmentedControlValue = "day";
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
    if (USING_HEALTH_DATA) {
      this.setup();
    }
    else {
      this.updateChart(SAMPLE_DATA[this.segmentedControlValue], false);
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
      this.updateChart(data, chartAlreadyGenerated);
    })
    .catch((e) => {
      console.log(e)
    });
  }

  async queryHealthData() {
    const numDaysPerUnit = {day: 1, week: 7, month: 30};
    const numDays = numDaysPerUnit[this.segmentedControlValue];

    const buckets = {day: "hour", week: "day", month: "day"};

    const domainToDataType = {steps: "steps", heartbeat: "heart_rate", calories: "calories"};
    const dataType = domainToDataType[this.global.stickerInfo.domain];

    if (dataType == "heart_rate") {
      return new Promise((resolve, reject) => {
        const startDate = new Date(new Date().getTime() - numDays * 24 * 60 * 60 * 1000);

        this.health.query({
          startDate: startDate,
          endDate: new Date(), // now
          dataType: dataType,
          limit: 50000,
          ascending: true
        })
        .then((res) => {
          debugger;
          const numBucketsPerUnit = {day: 24, week: 7, month: 30};
          const numBuckets = numBucketsPerUnit[this.segmentedControlValue];
          let result = new Array(numBuckets);

          const numHoursPerBucket = {hour: 1, day: 24};
          const numHours = numHoursPerBucket[buckets[this.segmentedControlValue]];

          for (var i = 0; i < result.length; i++) {
            result[i] = {
              startDate: startDate.getTime() + i * numHours * 60 * 60 * 1000,
              value: 0,
              count: 0
            };
          }

          res.forEach(element => {
            let timeOffset = Math.floor((element.startDate.getTime() - startDate.getTime()) / numHours / 60 / 60 / 1000);
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
        startDate: new Date(new Date().getTime() - numDays * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        dataType: dataType,
        bucket: buckets[this.segmentedControlValue]
      });
    }

  }

  updateChart(data: any[], chartAlreadyGenerated: boolean) {
    this.updateChartData(data);
    if (chartAlreadyGenerated) {
      this.timeChart.data.datasets[0].data = data;
      this.timeChart.data.datasets[0].backgroundColor = this.createColorArray();
      this.timeChart.update();
    }
    else {
      this.timeChart = new Chart("myChart", this.chartProperties(data));
    }
    this.loaded = true;
    this.redrawOverlay();
  }

  chartProperties(data: any[]) {
    return {
      type: 'bar',
      data: {
        datasets: [{
          data: data,
          backgroundColor: this.createColorArray()
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
    this.segmentedControlValue = ev.detail.value;
    if (USING_HEALTH_DATA) {
      this.updateChartFromHealthData(true);
    }
    else { this.updateChart(SAMPLE_DATA[this.segmentedControlValue], true); }
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
    this.timeChart.data.datasets[0].backgroundColor = this.createColorArray();
    this.redrawOverlay();
    this.timeChart.update();
  }

  updateDataInfo() {
    this.updateSelectedTimeRange();
    this.updateDataSum();
  }

  updateSelectedTimeRange() {
    const buckets = {day: "hours", week: "days", month: "days"}
    const formatStrings: object = {hours: "hA", days: "MMM D"}

    const initialMoment = moment(this.chartData[0]['t']);
    const moments = {
      start: initialMoment.clone().add(this.knobValues['lower'], buckets[this.segmentedControlValue]),
      end: initialMoment.clone().add(this.knobValues['upper'], buckets[this.segmentedControlValue]),
    }

    for (const moment in moments) {
      this.selectedTimeRange[moment] = moments[moment].format(formatStrings[buckets[this.segmentedControlValue]]);
    }
  }

  updateDataSum() {
    let sum = 0;
    for (var i = this.knobValues['lower']; i < this.knobValues['upper']; i++) {
      sum += this.chartData[i]['y'];
    }
    this.dataSumChanged.emit(sum);
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
