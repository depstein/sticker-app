import { Component, OnInit } from '@angular/core';
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  constructor(private health: Health) {

  }

  ngOnInit() {

    this.testHealth();
    
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // one month ago
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: 'day',
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

}
