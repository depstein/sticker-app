import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-total-calories-toast',
  templateUrl: './total-calories-toast.component.html',
  styleUrls: ['./total-calories-toast.component.scss'],
})
export class TotalCaloriesToastComponent implements OnInit {

  constructor(public toastController: ToastController) { }

  ngOnInit() {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

}
