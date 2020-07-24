import { Component, OnInit } from '@angular/core';
import { Chart } from "node_modules/chart.js";
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  data: number[];

  constructor(private health: Health) {
    this.data = [];
    // this.testHealth();
  }

  ngOnInit() {
    // this.pullData();
    var myChart = new Chart("myChart", {
        type: 'line',
        data: {
            datasets: [{
                label: 'Steps taken',
                data: [2, 5, 2, 5, 8, 8, 3, 8, 3, 1, 0, 2, 4, 7, 1, 5, 2, 5, 8, 9, 2, 4, 1, 6, 3, 2, 1, 6, 8, 9]
            }],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
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

  pullData() {
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // one month ago
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: 'day',
    })
    .then((res) => {
      console.log(res)
      this.data = res.map(function(value) {
        return Number(value.value);
      });

    })
    .catch((e) => {
      console.log(e)
    });

  }

}
