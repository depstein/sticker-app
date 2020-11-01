import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";

@Component({
  selector: 'app-select-data-modal',
  templateUrl: './select-data-modal.page.html',
  styleUrls: ['./select-data-modal.page.scss'],
})
export class SelectDataModalPage implements OnInit {
  dataValue: number;

  constructor(
    public viewCtrl: ModalController,
    public global: GlobalDataService)
    {
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
