import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';

const numberOfDaysPerUnit: object = {day: 1, week: 7, month: 30};
const buckets: object = {day: "hour", week: "day", month: "day"};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  timeChart: any;
  timeRange: string;
  chartData: object[];
  knobValues: object;
  sampleData: object;

  @Output() dataSumChanged = new EventEmitter<number>();

  constructor(private health: Health) {
    this.timeRange = "day";
    this.chartData = [];
    this.knobValues = {
      lower: 0,
      upper: 0
    };
    this.sampleData = {
      day: [{"t":"2020-08-14T03:00:00.000Z","y":5887},{"t":"2020-08-14T04:00:00.000Z","y":93},{"t":"2020-08-14T05:00:00.000Z","y":23},{"t":"2020-08-14T06:00:00.000Z","y":18},{"t":"2020-08-14T07:00:00.000Z","y":7},{"t":"2020-08-14T08:00:00.000Z","y":0},{"t":"2020-08-14T09:00:00.000Z","y":0},{"t":"2020-08-14T10:00:00.000Z","y":0},{"t":"2020-08-14T11:00:00.000Z","y":0},{"t":"2020-08-14T12:00:00.000Z","y":0},{"t":"2020-08-14T13:00:00.000Z","y":25},{"t":"2020-08-14T14:00:00.000Z","y":1002},{"t":"2020-08-14T15:00:00.000Z","y":8283},{"t":"2020-08-14T16:00:00.000Z","y":68},{"t":"2020-08-14T17:00:00.000Z","y":235},{"t":"2020-08-14T18:00:00.000Z","y":641},{"t":"2020-08-14T19:00:00.000Z","y":0},{"t":"2020-08-14T20:00:00.000Z","y":98},{"t":"2020-08-14T21:00:00.000Z","y":0},{"t":"2020-08-14T22:00:00.000Z","y":0},{"t":"2020-08-14T23:00:00.000Z","y":0},{"t":"2020-08-15T00:00:00.000Z","y":0},{"t":"2020-08-15T01:00:00.000Z","y":0},{"t":"2020-08-15T02:00:00.000Z","y":0},{"t":"2020-08-15T03:00:00.000Z","y":0}],
      week: [{"t":"2020-08-07T07:00:00.000Z","y":15226},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10382}],
      month: [{"t":"2020-07-15T07:00:00.000Z","y":4953},{"t":"2020-07-16T07:00:00.000Z","y":3752},{"t":"2020-07-17T07:00:00.000Z","y":5926},{"t":"2020-07-18T07:00:00.000Z","y":6311},{"t":"2020-07-19T07:00:00.000Z","y":10222},{"t":"2020-07-20T07:00:00.000Z","y":9380},{"t":"2020-07-21T07:00:00.000Z","y":10143},{"t":"2020-07-22T07:00:00.000Z","y":15724},{"t":"2020-07-23T07:00:00.000Z","y":10937},{"t":"2020-07-24T07:00:00.000Z","y":13556},{"t":"2020-07-25T07:00:00.000Z","y":871},{"t":"2020-07-26T07:00:00.000Z","y":1584},{"t":"2020-07-27T07:00:00.000Z","y":8262},{"t":"2020-07-28T07:00:00.000Z","y":8741},{"t":"2020-07-29T07:00:00.000Z","y":1282},{"t":"2020-07-30T07:00:00.000Z","y":1561},{"t":"2020-07-31T07:00:00.000Z","y":9786},{"t":"2020-08-01T07:00:00.000Z","y":5303},{"t":"2020-08-02T07:00:00.000Z","y":8640},{"t":"2020-08-03T07:00:00.000Z","y":10272},{"t":"2020-08-04T07:00:00.000Z","y":7076},{"t":"2020-08-05T07:00:00.000Z","y":1243},{"t":"2020-08-06T07:00:00.000Z","y":496},{"t":"2020-08-07T07:00:00.000Z","y":15226},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10382}]
    };
  }

  ngOnInit() {
    this.testHealth();
    this.generateChart(this.sampleData[this.timeRange]);
  }

  testHealth() {
    this.health.isAvailable()
    .then((available:boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight']  //write only permission
        }
      ])
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  generateChartFromHealthData() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - numberOfDaysPerUnit[this.timeRange] * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: buckets[this.timeRange],
    })
    .then((res) => {
      let data = this.createTimeObjectArray(res);
      this.generateChart(data);
    })
    .catch((e) => {
      console.log(e)
    });
  }

  generateChart(data: any[]) {
    this.timeChart = new Chart("myChart", {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Steps taken',
          data: data
        }],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
          }],
        }
      }
    });
    this.updateChartData(data);
  }

  segmentChanged(ev: any) {
    this.timeRange = ev.detail.value;
    this.updateChart(this.sampleData[this.timeRange]);
  }

  updateChartData(chartData: object[]) {
    this.chartData = chartData;
    this.knobValues['lower'] = Math.round(this.chartData.length * 0.25);
    this.knobValues['upper'] = Math.round(this.chartData.length * 0.75);
    this.updateDataSum();
  }

  getNumberOfTicks() {
    return this.chartData.length - 1;
  }

  updateDataSum() {
    let sum = 0;
    for (var i = this.knobValues['lower']; i <= this.knobValues['upper']; i++) {
      sum += this.chartData[i]['y'];
    }
    this.dataSumChanged.emit(sum);
  }

  updateChartFromHealthData() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - numberOfDaysPerUnit[this.timeRange] * 24 * 60 * 60 * 1000), // one month ago
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: buckets[this.timeRange],
    })
    .then((res) => {
      let data = this.createTimeObjectArray(res);
      this.updateChart(data);
    })
    .catch((e) => {
      console.log(e)
    });
  }

  updateChart(data: any[]) {
    this.timeChart.data.datasets[0].data = data;
    this.timeChart.update();
    this.updateChartData(data);
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
