import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {
  knobValues: any;
  chartData: any[];
  sampleData: any;
  dataSum: number;

  constructor(public viewCtrl: ModalController) {
    this.knobValues = {
      lower: 2,
      upper: 5
    };
    this.chartData = [];
    this.dataSum = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({steps:10000});
  }

  onChartDataChanged(chartData: object[]) {
    this.chartData = chartData;
    console.log(this.chartData);

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
