import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {
  dataSum: number;

  constructor(public viewCtrl: ModalController) {
    this.dataSum = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({
      sum: this.dataSum
    });
  }

  onDataSumChanged(dataSum: number) {
    this.dataSum = dataSum;
  }

}
