import { Component, OnInit } from '@angular/core';
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  numberOfDays: object;
  buckets: object;
  timeRange: string;

  constructor(private health: Health) {
    this.numberOfDays = {day: 1, week: 7, month: 30};
    this.buckets = {day: "hour", week: "day", month: "day"};
    this.timeRange = "day";
  }

  ngOnInit() {
    this.testHealth();
    this.generateChart();
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


  generateChart() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - this.numberOfDays[this.timeRange] * 24 * 60 * 60 * 1000), // one month ago
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: this.buckets[this.timeRange],
    })
    .then((res) => {
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Steps taken',
            data: res.map(function(value) {
              return {
                t: value.startDate,
                y: Number(value.value)
              };
            })
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
    })
    .catch((e) => {
      console.log(e)
    });
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.timeRange = ev.detail.value;
    this.generateChart();
  }

}
