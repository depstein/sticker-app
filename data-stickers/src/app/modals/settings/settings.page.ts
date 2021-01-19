import { Component, OnInit, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AnalyticsService } from '../../analytics.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  idInput: string;
  healthPermission: boolean;
  spotifyPermission: boolean;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private analyticsService: AnalyticsService,
    private storage: Storage
  ) { 
    this.getIdandPermissionsFromStorage();
  }

  ngOnInit() {
  }

  getIdandPermissionsFromStorage(){
    console.log("here");
    this.storage.get('id')
    .then((value) => {
      this.idInput = value;
    })  
    this.storage.get('healthPermission')
    .then((value) => {
      this.healthPermission = value;
    })
    this.storage.get('spotifyPermission')
    .then((value) => {
      if (value == null)
        this.spotifyPermission = false;
      else
        this.spotifyPermission = value;
    })
  }

  async closeModal() {
    if (this.idInput != null)
      this.storage.set('id', this.idInput);
      this.analyticsService.setUser(this.idInput);
    this.storage.set('healthPermission', this.healthPermission);
    this.storage.set('spotifyPermission', this.spotifyPermission);
    await this.modalController.dismiss();
  }

  clearAllSettings() {
    this.storage.remove('id')
    this.storage.remove('domain')
    this.storage.remove('healthPermission')
    this.storage.remove('spotifyPermission')
    .then(() => {
      this.idInput = null;
      this.healthPermission = false; 
      this.spotifyPermission = false;
      this.presentToast()
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User info has been cleared',
      duration: 2000
    });
    toast.present().then(() => {
      this.navCtrl.navigateRoot('/home'); // Navigation currently doesn't work
    })
  }

}
