import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id:string;
  constructor(private alertController:AlertController) {
  	//TODO: try to load the user ID from local storage, and don't create this page if they're already logged in.
  	this.presentLogIn();
  }

  async presentLogIn() {
  	const alert = await this.alertController.create({
      header: 'Please Log In',
      inputs: [
        {
          name: 'userId',
          type: 'text',
          placeholder: 'User Id'
        }
      ],
      buttons: [
      	{
          text: 'Submit',
          handler: (response) => {
          	this.id = response.userId;
          	console.log('Logged in as ' + response.userId);
          }
        }
      ],
      backdropDismiss:false
    });

    await alert.present();
  }
}
