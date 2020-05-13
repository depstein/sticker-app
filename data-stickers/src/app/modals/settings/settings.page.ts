import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  idInput: string;
  healthPermission: boolean;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private storage: Storage
  ) { 
    this.getIdandPermissionFromStorage();
  }

  ngOnInit() {}

  getIdandPermissionFromStorage(){
    this.storage.get('id')
    .then((value) => {
      this.idInput = value;
    })  
    this.storage.get('healthPermission')
    .then((value) => {
      this.healthPermission = value;
    })  
  }

  async closeModal() {
    if (this.idInput != null)
      this.storage.set('id', this.idInput);
    this.storage.set('healthPermission', this.healthPermission);
    await this.modalController.dismiss();
  }

  clearAllSettings() {
    this.storage.remove('id')
    .then(() => {
      this.storage.remove('domain')
      .then(() => {
        this.storage.remove('healthPermission')
        .then(() => {
          this.idInput = null;
          this.healthPermission = false; 
          this.presentToast()
        })
      })
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User info has been cleared',
      duration: 2000
    });
    toast.present().then(() => {
      this.navCtrl.navigateRoot('/home');
    })
  }

}
