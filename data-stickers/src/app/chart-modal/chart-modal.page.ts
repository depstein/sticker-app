import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {
  knobValues: any;
  // sample chart data
  chartData: any[] = [{"t":"2020-08-07T07:00:00.000Z","y":15226.91504233753},{"t":"2020-08-08T07:00:00.000Z","y":155},{"t":"2020-08-09T07:00:00.000Z","y":2619.118505172607},{"t":"2020-08-10T07:00:00.000Z","y":16616},{"t":"2020-08-11T07:00:00.000Z","y":1021},{"t":"2020-08-12T07:00:00.000Z","y":12206},{"t":"2020-08-13T07:00:00.000Z","y":15281},{"t":"2020-08-14T07:00:00.000Z","y":10262.263678286228}];
  dataSum: number;

  constructor(public viewCtrl: ModalController) {
    this.knobValues = {
      lower: 2,
      upper: 5
    };
    this.dataSum = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({steps:10000});
  }

  onChartDataChanged(chartData: object[]) {
    this.chartData = chartData;
  }

  getNumberOfTicks() {
    return this.chartData.length - 1;
  }

  updateDataSum() {
    let sum = 0;
    for (var i = this.knobValues.lower; i <= this.knobValues.upper; i++) {
      sum += this.chartData[i].y;
    }
    this.dataSum = sum;
    console.log(this.dataSum);

  }

}
