import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {
  dataValue: number;

  constructor(public viewCtrl: ModalController) {
    this.dataValue = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({
      sum: this.dataValue
    });
  }

  onDataValueChanged(dataValue: number) {
    this.dataValue = dataValue;
  }

}
