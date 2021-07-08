import { Component, OnInit, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { AnalyticsService } from '../../analytics.service';
import { Health } from '@ionic-native/health/ngx';

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
    private storage: Storage,
    private health: Health,
    private alertController: AlertController
  ) { 
    this.getIdandPermissionsFromStorage();
    // this.getHealthPermission();
    // this.getSpotifyPermission();
    this.storage.get('healthPermission')
    .then((value) => {
      console.log('healthPermission ' + value);
    })
    this.storage.get('spotifyPermission')
    .then((value) => {
      console.log('spotifyPermission ' + value);
    })
  }

  ngOnInit() {
    this.getIdandPermissionsFromStorage();
  }

  getIdandPermissionsFromStorage(){
    this.storage.get('id')
    .then((value) => {
      this.idInput = value;
    })  
    this.storage.get('healthPermission')
    .then((value) => {
      if (value == null) {
        this.healthPermission = false;
      } else {
        this.healthPermission = value;
      }
    })
    this.storage.get('spotifyPermission')
    .then((value) => {
      if (value == null) {
        this.spotifyPermission = false;
      } else {
        this.spotifyPermission = value;
      }
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
    // this.storage.remove('id')
    this.storage.remove('domain')
    this.storage.remove('healthPermission')
    this.storage.remove('spotifyPermission')
    .then(() => {
      // this.idInput = null;
      this.healthPermission = false; 
      this.spotifyPermission = false;
      this.storage.set('healthPermission', false);
      this.storage.set('spotifyPermission', false);
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
  
  async presenUserIdInputAlert() {
    const alert = await this.alertController.create({
      message: `Enter your user id`,
      inputs: [
        {
          name: 'value',
          value: this.idInput,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: data => {
            console.log(data.value);
            this.idInput = data.value;
            this.storage.set('id', data.value);
            this.analyticsService.setUser(data.value);
          }
        }
      ]
    });
    await alert.present();
  }

  // if permission = true, hide button and display text
  getSpotifyPermission() {
    this.storage.get('spotifyPermission')
      .then((value) => {
        console.log('spotifyPermission ' + value);
        if (value == true) {
          console.log('spotifyPermission ' + value);
        } else {
          console.log("open webpage");
          var userid: string = "";
          this.storage.get('id')
            .then((value) => {
              userid = value;
              console.log(userid);
              window.open("https://sticker-spotify.herokuapp.com/login/" + String(userid), "_self");
              this.storage.set('spotifyPermission', true);
              this.spotifyPermission = true; 
            })  
          
        }

      })
  }
  
  // if permission = true, hide button and display text
  getHealthPermission() {
    this.storage.get('healthPermission')
      .then((value) => {
        console.log('healthPermission ' + value);
        if (value == true){
          console.log('healthPermission ' + value);
        } else {
          this.health.isAvailable()
          .then(() => {
            this.health.requestAuthorization([{
                read: ['steps', 'heart_rate', 'calories']
            }])
            .then(() => {
              this.storage.set('healthPermission', true);
              this.healthPermission = true; 
              console.log('healthPermission ' + value);
            })
            .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
        }
      })
  }

}


