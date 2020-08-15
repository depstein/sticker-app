import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {
  chartData: any[];
  knobValues: any;
  sampleData: any;
  dataSum: number;

  constructor(public viewCtrl: ModalController) {
    this.chartData = [];
    this.knobValues = {
      lower: 0,
      upper: 0
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
    this.knobValues.lower = Math.round(this.chartData.length * 0.25);
    this.knobValues.upper = Math.round(this.chartData.length * 0.75);
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
