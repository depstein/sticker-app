import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-stickers',
  templateUrl: './create-stickers.page.html',
  styleUrls: ['./create-stickers.page.scss'],
})
export class CreateStickersPage implements OnInit {
  selector:any;
  custom:any;
  goal:any;
  image:String;
  domain:String;
  unit:any[] = [];
	addedGoal:Boolean;
	
  constructor(public alertController: AlertController, public route: ActivatedRoute) {
    this.custom = "custom";
    this.goal = "ADD GOAL"; 
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.addedGoal = false;
		if(this.domain == "calories"){
      this.unit = ["calories"];
    }
    else if(this.domain == "steps"){
      this.unit = ["steps", "mile", "km"];
    }
    else if(this.domain == "music"){
      this.unit=["minutes", "hour","times" ];
    }
    else if(this.domain == "time"){
      this.unit=["hours","minutes","days"];
    }
    else if(this.domain == "heartrate"){
      this.unit=["bpm"];
    }
  }
  ngOnInit() {
  }
  changeUnit(){
  }
  addGoal(){
    if(this.goal == "REMOVE GOAL"){
      this.goal = "ADD GOAL";
			this.addedGoal = true;
    }
    else{
      this.goal = "REMOVE GOAL";
			this.addedGoal = false;
    }
  }
  customUnit(selector){
    if (selector == "custom"){
      this.presentPrompt() ;
    }
  }
  async presentPrompt() {
    const alert = await this.alertController.create({
      header: 'Customize Unit!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'units'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: data => {
            //this.custom = data.name;
						this.unit.push(data.name);	
          }
        }
      ]
    });
    await alert.present();
  }
}