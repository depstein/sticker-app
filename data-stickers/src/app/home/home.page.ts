import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StylesCompileDependency } from '@angular/compiler';

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

  constructor(private storage: Storage, private router: Router, private alertController: AlertController) {
    this.idEntered = false;
    this.onHomeScreen = true;
    this.userId = '';
    this.checkForUserIdAndDomain(); // Checks Ionic local storage for User ID and last-visited domain 
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
          }
        }
      ],
      backdropDismiss: false 
    });
    await alert.present();
  }

  setUserId(idInput){
    this.storage.set('id', idInput);
    this.userId = idInput;
    this.idEntered = true; 
  }
}
