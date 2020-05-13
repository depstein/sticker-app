import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StylesCompileDependency } from '@angular/compiler';
//import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  userId: string; 
  idEntered: boolean;
  idInput: string;
  onHomeScreen: boolean;
  healthPermission: boolean;

  constructor(private storage: Storage, private router: Router, private alertController: AlertController) {
    this.idEntered = false;
    this.onHomeScreen = true;
    this.userId = '';
    this.checkForUserIdAndDomain(); // Checks Ionic local storage for User ID and last-visited domain 
    //this.testHealth()
  }

  checkForUserIdAndDomain(){
    this.storage.get('id')
    .then((value) => {
      if (value != null){
        this.userId = value;
        this.idEntered = true; 
        this.checkForDomain();
      } else {
        this.presentIdInputPrompt()
      }
    })
  }

  checkForDomain(){
    this.storage.get('domain')
    .then((value) => {
      if (value != null){
        this.router.navigate([
          'home/'+value
        ]);
      }
    })
  }

  checkForHealthPermission(){
    this.storage.get('healthPermission')
    .then((value) => {
      if (value != null){
        this.healthPermission = value;
      }
    })
  }

  async presentIdInputPrompt() {
    const alert = await this.alertController.create({
      header: 'Please enter your user ID:',
      inputs: [
        {
          name: 'id',
          type: 'text',
          placeholder: 'user ID'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            this.setUserId(data.id);
            this.presentHealthPrompt();
          }
        }
      ],
      backdropDismiss: false 
    });
    await alert.present();
  }

  async presentHealthPrompt() {
    const alert = await this.alertController.create({
      header: 'Would you like to allow data to be pulled from Healthkit?',
      inputs: [
        {
          name: 'healthPermission',
          type: 'checkbox',
          value: 'permission'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            this.setHealthPermission((data.length == 1) ? true : false)
          }
        }
      ],
      backdropDismiss: false 
    });
    await alert.present();
  }

  setUserId(idInput: string){
    this.storage.set('id', idInput);
    this.userId = idInput;
    this.idEntered = true; 
  }

  setHealthPermission(permission: boolean){
    this.storage.set('healthPermission', permission)
    this.healthPermission = permission;
  }

  /*testHealth() {
    this.health.isAvailable()
    .then((available:boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight']  //write only permission
        }
      ])
      .then(res => console.log(res))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }*/

}
