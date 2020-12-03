import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';
import * as moment from 'moment';

const USING_HEALTH_DATA: boolean = false;

const SAMPLE_DATA: object = {
  steps: {
    day: [{"t":"2020-09-17T19:00:00.000Z","y":385},{"t":"2020-09-17T20:00:00.000Z","y":121},{"t":"2020-09-17T21:00:00.000Z","y":31},{"t":"2020-09-17T22:00:00.000Z","y":64},{"t":"2020-09-17T23:00:00.000Z","y":0},{"t":"2020-09-18T00:00:00.000Z","y":5820},{"t":"2020-09-18T01:00:00.000Z","y":4311},{"t":"2020-09-18T02:00:00.000Z","y":134},{"t":"2020-09-18T03:00:00.000Z","y":94},{"t":"2020-09-18T04:00:00.000Z","y":121},{"t":"2020-09-18T05:00:00.000Z","y":87},{"t":"2020-09-18T06:00:00.000Z","y":24},{"t":"2020-09-18T07:00:00.000Z","y":0},{"t":"2020-09-18T08:00:00.000Z","y":0},{"t":"2020-09-18T09:00:00.000Z","y":0},{"t":"2020-09-18T10:00:00.000Z","y":0},{"t":"2020-09-18T11:00:00.000Z","y":0},{"t":"2020-09-18T12:00:00.000Z","y":0},{"t":"2020-09-18T13:00:00.000Z","y":0},{"t":"2020-09-18T14:00:00.000Z","y":0},{"t":"2020-09-18T15:00:00.000Z","y":39},{"t":"2020-09-18T16:00:00.000Z","y":916},{"t":"2020-09-18T17:00:00.000Z","y":122},{"t":"2020-09-18T18:00:00.000Z","y":0}],
    week: [{"t":"2020-09-12T07:00:00.000Z","y":1527},{"t":"2020-09-13T07:00:00.000Z","y":471},{"t":"2020-09-14T07:00:00.000Z","y":2806},{"t":"2020-09-15T07:00:00.000Z","y":4453},{"t":"2020-09-16T07:00:00.000Z","y":15580},{"t":"2020-09-17T07:00:00.000Z","y":13496},{"t":"2020-09-18T07:00:00.000Z","y":1077}],
    month: [{"t":"2020-08-20T07:00:00.000Z","y":14830},{"t":"2020-08-21T07:00:00.000Z","y":1601},{"t":"2020-08-22T07:00:00.000Z","y":2556},{"t":"2020-08-23T07:00:00.000Z","y":184},{"t":"2020-08-24T07:00:00.000Z","y":4732},{"t":"2020-08-25T07:00:00.000Z","y":6832},{"t":"2020-08-26T07:00:00.000Z","y":2274},{"t":"2020-08-27T07:00:00.000Z","y":9531},{"t":"2020-08-28T07:00:00.000Z","y":771},{"t":"2020-08-29T07:00:00.000Z","y":1074},{"t":"2020-08-30T07:00:00.000Z","y":5470},{"t":"2020-08-31T07:00:00.000Z","y":2545},{"t":"2020-09-01T07:00:00.000Z","y":7186},{"t":"2020-09-02T07:00:00.000Z","y":4836},{"t":"2020-09-03T07:00:00.000Z","y":13674},{"t":"2020-09-04T07:00:00.000Z","y":7531},{"t":"2020-09-05T07:00:00.000Z","y":745},{"t":"2020-09-06T07:00:00.000Z","y":1820},{"t":"2020-09-07T07:00:00.000Z","y":5137},{"t":"2020-09-08T07:00:00.000Z","y":1904},{"t":"2020-09-09T07:00:00.000Z","y":6476},{"t":"2020-09-10T07:00:00.000Z","y":4235},{"t":"2020-09-11T07:00:00.000Z","y":1749},{"t":"2020-09-12T07:00:00.000Z","y":1527},{"t":"2020-09-13T07:00:00.000Z","y":471},{"t":"2020-09-14T07:00:00.000Z","y":2806},{"t":"2020-09-15T07:00:00.000Z","y":4453},{"t":"2020-09-16T07:00:00.000Z","y":15580},{"t":"2020-09-17T07:00:00.000Z","y":13496},{"t":"2020-09-18T07:00:00.000Z","y":1077}]
  },
  heartbeat: {
    day: [{"t":"2020-09-17T19:00:00.000Z","y":0},{"t":"2020-09-17T20:00:00.000Z","y":0},{"t":"2020-09-17T21:00:00.000Z","y":0},{"t":"2020-09-17T22:00:00.000Z","y":0},{"t":"2020-09-17T23:00:00.000Z","y":0},{"t":"2020-09-18T00:00:00.000Z","y":111},{"t":"2020-09-18T01:00:00.000Z","y":114},{"t":"2020-09-18T02:00:00.000Z","y":79},{"t":"2020-09-18T03:00:00.000Z","y":76},{"t":"2020-09-18T04:00:00.000Z","y":86},{"t":"2020-09-18T05:00:00.000Z","y":78},{"t":"2020-09-18T06:00:00.000Z","y":70},{"t":"2020-09-18T07:00:00.000Z","y":0},{"t":"2020-09-18T08:00:00.000Z","y":0},{"t":"2020-09-18T09:00:00.000Z","y":0},{"t":"2020-09-18T10:00:00.000Z","y":0},{"t":"2020-09-18T11:00:00.000Z","y":0},{"t":"2020-09-18T12:00:00.000Z","y":0},{"t":"2020-09-18T13:00:00.000Z","y":0},{"t":"2020-09-18T14:00:00.000Z","y":0},{"t":"2020-09-18T15:00:00.000Z","y":75},{"t":"2020-09-18T16:00:00.000Z","y":75},{"t":"2020-09-18T17:00:00.000Z","y":73},{"t":"2020-09-18T18:00:00.000Z","y":0}],
    week: [{"t":"2020-09-12T07:00:00.000Z","y":75},{"t":"2020-09-13T07:00:00.000Z","y":60},{"t":"2020-09-14T07:00:00.000Z","y":79},{"t":"2020-09-15T07:00:00.000Z","y":74},{"t":"2020-09-16T07:00:00.000Z","y":166},{"t":"2020-09-17T07:00:00.000Z","y":110},{"t":"2020-09-18T07:00:00.000Z","y":74}],
    month: [{"t":"2020-08-20T07:00:00.000Z","y":98},{"t":"2020-08-21T07:00:00.000Z","y":67},{"t":"2020-08-22T07:00:00.000Z","y":68},{"t":"2020-08-23T07:00:00.000Z","y":65},{"t":"2020-08-24T07:00:00.000Z","y":95},{"t":"2020-08-25T07:00:00.000Z","y":87},{"t":"2020-08-26T07:00:00.000Z","y":91},{"t":"2020-08-27T07:00:00.000Z","y":95},{"t":"2020-08-28T07:00:00.000Z","y":59},{"t":"2020-08-29T07:00:00.000Z","y":65},{"t":"2020-08-30T07:00:00.000Z","y":113},{"t":"2020-08-31T07:00:00.000Z","y":69},{"t":"2020-09-01T07:00:00.000Z","y":82},{"t":"2020-09-02T07:00:00.000Z","y":138},{"t":"2020-09-03T07:00:00.000Z","y":100},{"t":"2020-09-04T07:00:00.000Z","y":142},{"t":"2020-09-05T07:00:00.000Z","y":68},{"t":"2020-09-06T07:00:00.000Z","y":69},{"t":"2020-09-07T07:00:00.000Z","y":91},{"t":"2020-09-08T07:00:00.000Z","y":91},{"t":"2020-09-09T07:00:00.000Z","y":76},{"t":"2020-09-10T07:00:00.000Z","y":70},{"t":"2020-09-11T07:00:00.000Z","y":68},{"t":"2020-09-12T07:00:00.000Z","y":75},{"t":"2020-09-13T07:00:00.000Z","y":60},{"t":"2020-09-14T07:00:00.000Z","y":79},{"t":"2020-09-15T07:00:00.000Z","y":74},{"t":"2020-09-16T07:00:00.000Z","y":166},{"t":"2020-09-17T07:00:00.000Z","y":110},{"t":"2020-09-18T07:00:00.000Z","y":74}]
  },
  calories: {
    day: [{"t":"2020-09-17T19:00:00.000Z","y":67},{"t":"2020-09-17T20:00:00.000Z","y":67},{"t":"2020-09-17T21:00:00.000Z","y":67},{"t":"2020-09-17T22:00:00.000Z","y":67},{"t":"2020-09-17T23:00:00.000Z","y":67},{"t":"2020-09-18T00:00:00.000Z","y":279},{"t":"2020-09-18T01:00:00.000Z","y":233},{"t":"2020-09-18T02:00:00.000Z","y":86},{"t":"2020-09-18T03:00:00.000Z","y":82},{"t":"2020-09-18T04:00:00.000Z","y":84},{"t":"2020-09-18T05:00:00.000Z","y":80},{"t":"2020-09-18T06:00:00.000Z","y":76},{"t":"2020-09-18T07:00:00.000Z","y":66},{"t":"2020-09-18T08:00:00.000Z","y":66},{"t":"2020-09-18T09:00:00.000Z","y":66},{"t":"2020-09-18T10:00:00.000Z","y":66},{"t":"2020-09-18T11:00:00.000Z","y":66},{"t":"2020-09-18T12:00:00.000Z","y":64},{"t":"2020-09-18T13:00:00.000Z","y":66},{"t":"2020-09-18T14:00:00.000Z","y":65},{"t":"2020-09-18T15:00:00.000Z","y":68},{"t":"2020-09-18T16:00:00.000Z","y":107},{"t":"2020-09-18T17:00:00.000Z","y":77},{"t":"2020-09-18T18:00:00.000Z","y":2}],
    week: [{"t":"2020-09-12T07:00:00.000Z","y":1781},{"t":"2020-09-13T07:00:00.000Z","y":1616},{"t":"2020-09-14T07:00:00.000Z","y":1849},{"t":"2020-09-15T07:00:00.000Z","y":1874},{"t":"2020-09-16T07:00:00.000Z","y":2615},{"t":"2020-09-17T07:00:00.000Z","y":2091},{"t":"2020-09-18T07:00:00.000Z","y":781}],
    month: [{"t":"2020-08-20T07:00:00.000Z","y":2292},{"t":"2020-08-21T07:00:00.000Z","y":1745},{"t":"2020-08-22T07:00:00.000Z","y":1850},{"t":"2020-08-23T07:00:00.000Z","y":1622},{"t":"2020-08-24T07:00:00.000Z","y":1764},{"t":"2020-08-25T07:00:00.000Z","y":1875},{"t":"2020-08-26T07:00:00.000Z","y":1908},{"t":"2020-08-27T07:00:00.000Z","y":2027},{"t":"2020-08-28T07:00:00.000Z","y":1637},{"t":"2020-08-29T07:00:00.000Z","y":1723},{"t":"2020-08-30T07:00:00.000Z","y":1989},{"t":"2020-08-31T07:00:00.000Z","y":1832},{"t":"2020-09-01T07:00:00.000Z","y":1940},{"t":"2020-09-02T07:00:00.000Z","y":1897},{"t":"2020-09-03T07:00:00.000Z","y":2232},{"t":"2020-09-04T07:00:00.000Z","y":2181},{"t":"2020-09-05T07:00:00.000Z","y":1694},{"t":"2020-09-06T07:00:00.000Z","y":1819},{"t":"2020-09-07T07:00:00.000Z","y":1860},{"t":"2020-09-08T07:00:00.000Z","y":1873},{"t":"2020-09-09T07:00:00.000Z","y":2003},{"t":"2020-09-10T07:00:00.000Z","y":1867},{"t":"2020-09-11T07:00:00.000Z","y":1843},{"t":"2020-09-12T07:00:00.000Z","y":1781},{"t":"2020-09-13T07:00:00.000Z","y":1616},{"t":"2020-09-14T07:00:00.000Z","y":1849},{"t":"2020-09-15T07:00:00.000Z","y":1874},{"t":"2020-09-16T07:00:00.000Z","y":2615},{"t":"2020-09-17T07:00:00.000Z","y":2091},{"t":"2020-09-18T07:00:00.000Z","y":781}]
  }
  
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
    if (USING_HEALTH_DATA) {
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
    if (USING_HEALTH_DATA) {
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
