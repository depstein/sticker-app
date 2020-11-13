import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";

@Component({
  selector: 'app-select-data-modal',
  templateUrl: './select-data-modal.page.html',
  styleUrls: ['./select-data-modal.page.scss'],
})
export class SelectDataModalPage implements OnInit {
  totalCalories: number;
  dataValue: number;

  constructor(
    public viewCtrl: ModalController,
    public toastController: ToastController,
    public global: GlobalDataService)
    {
    this.totalCalories = 0;
    this.dataValue = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({
      sum: this.dataValue
    });
  }

  onTotalCaloriesChanged(totalCalories: number) {
    this.totalCalories = totalCalories;
    this.presentToast();
  }

  onDataValueChanged(dataValue: number) {
    this.dataValue = dataValue;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Total Calories: ${this.totalCalories}`,
      duration: 2000
    });
    toast.present();
  }

}
