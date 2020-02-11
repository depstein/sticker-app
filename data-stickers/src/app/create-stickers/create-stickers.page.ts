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
	input_value:number;
	selected_unit:String;
	goal_str:any;
	
  constructor(public alertController: AlertController, public route: ActivatedRoute) {
    this.custom = "custom";
    this.goal = "ADD GOAL"; 
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.addedGoal = false;
		this.input_value = 0;
		this.goal_str = '';
		
		if(this.domain == "calories"){
      this.unit = ["calories"];
    }
    else if(this.domain == "steps"){
      this.unit = ["steps", "mile", "km"];
    }
    else if(this.domain == "music"){
      this.unit=["minutes", "hours", "times"];
    }
    else if(this.domain == "time"){
      this.unit=["hours", "minutes", "days"];
    }
    else if(this.domain == "heartrate"){
      this.unit=["bpm"];
    }
  }
	
  ngOnInit() {
  }
	
  changeUnit(){
  }
	
	convertValue(currentUnit, newUnit){
		// Add error prevention for custom units (check to verify that both currentUnit and newUnit are present in the units array)
		currentUnit = currentUnit.trim();
		newUnit = newUnit.trim();
		
		if (this.domain == 'steps') {
			if (currentUnit == 'mile') {
				if (newUnit == 'km') {
					return this.input_value * 1.60934;
				}
			} else if (currentUnit == 'km') {
				if (newUnit == 'mile') {
					return this.input_value / 1.60934;
				}
			}
			
		} else if (this.domain == 'music') { // Average song playtime = 3.5 minutes
			if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					return this.input_value / 60;
				} else if (newUnit == 'times') {
					return this.input_value / 3.5;
				}
			} else if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					return this.input_value * 60;
				} else if (newUnit == 'times') {
					return this.input_value * 60 / 3.5;
				}
				
			} else if (currentUnit == 'times') {
				if (newUnit == 'minutes') {
					return this.input_value * 3.5;
				} else if (newUnit == 'hours') {
					return this.input_value * 3.5 / 60;
				}
			}
			
		} else {	// time
			if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					return this.input_value * 60;
				} else if (newUnit == 'days') {
					return this.input_value / 24; 
				}
			} else if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					return this.input_value / 60;
				} else if (newUnit == 'days') {
					return this.input_value / 60 / 24;
				}
			} else if (currentUnit == 'days') {
				if (newUnit == 'minutes') {
					return this.input_value * 24 * 60;
				} else if (newUnit == 'hours') {
					return this.input_value * 24;
				}
			}
		}
		
		
	}
	
  addGoal(){
    if(this.goal == "REMOVE GOAL"){
      this.goal = "ADD GOAL";
			this.addedGoal = true;
    }
    else{
      this.goal = "REMOVE GOAL";
			this.addedGoal = false;
			this.goal_str = this.input_value + ' ' + this.selected_unit;
    }
  }
	
  customUnit(selector){
    if (selector == "custom"){
      this.presentPrompt();
    }
		if (this.selected_unit != undefined) {
			console.log("calling convertValue");
			this.input_value = this.convertValue(this.selected_unit, this.selector)
		} else {
			console.log("undefined");
		}
		this.selected_unit = this.selector;
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