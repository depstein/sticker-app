import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  timeChart: any;
  numberOfDays: object;
  buckets: object;
  timeRange: string;
  sampleData: object[];

  @Input() chartData: object[];
  @Output() chartDataChanged = new EventEmitter<object[]>();

  constructor(private health: Health) {
    this.numberOfDays = {day: 1, week: 7, month: 30};
    this.buckets = {day: "hour", week: "day", month: "day"};
    this.timeRange = "day";
    this.sampleData = [{"t":"2020-08-07T07:00:00.000Z","y":15226.91504233753},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619.118505172607},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10262.263678286228}];
  }

  ngOnInit() {
    this.testHealth();
    this.generateSampleChart();
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

  generateSampleChart() {
    let data = this.sampleData;
    this.generateChart(data);
  }

  generateChartFromHealthData() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - this.numberOfDays[this.timeRange] * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: this.buckets[this.timeRange],
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
    this.chartDataChanged.emit(data);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.timeRange = ev.detail.value;
    this.updateSampleChart();
  }

  updateSampleChart() {
    let data = this.sampleData;
    this.updateChart(data);
  }

  updateChartFromHealthData() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - this.numberOfDays[this.timeRange] * 24 * 60 * 60 * 1000), // one month ago
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: this.buckets[this.timeRange],
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
    this.chartDataChanged.emit(data);
  }

  createTimeObjectArray(res) {
    return res.map(function(value) {
      return {
        t: value.startDate,
        y: Number(value.value)
      };
    });
  }

}
