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
	input_value:number;
	music_input_value:String;
	selected_unit:String;
	goal_str:any;
	music_units:any[] = [];
	defaultUnit:any; 
	pulse:boolean;
	shake:boolean;
	fill:boolean;
	countUp:boolean;
	music_str:String;
	
  constructor(public alertController: AlertController, public route: ActivatedRoute) {
    this.custom = "custom";
    this.goal = "ADD GOAL"; 
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.input_value = 0;
		this.music_input_value = "The Beatles";
		this.goal_str = '';
		this.music_units = ['songs', 'albums', 'artists']; 
		
		this.pulse = false;
		this.shake = false;
		this.fill = false;
		this.countUp = false;
		
		
		if(this.domain == "calories"){
      this.unit = ["calories"];
			this.selector = this.unit[0].trim();
			this.selected_unit = this.selector;
    }
    else if(this.domain == "steps"){
      this.unit = ["steps", "mile", "km"];
			this.selector = this.unit[0].trim();
			this.selected_unit = this.selector;
    }
    else if(this.domain == "music"){
      this.unit=["minutes", "hours", "plays"]; 
			this.selector = this.unit[0].trim();
			this.music_selector = this.music_units[0].trim();
			this.selected_unit = this.selector;
    }
    else if(this.domain == "time"){
      this.unit=["hours", "minutes", "days"];
			this.selector = this.unit[0].trim();
			this.selected_unit = this.selector;
    }
    else if(this.domain == "heartrate"){
      this.unit=["bpm"];
			this.selector = this.unit[0].trim();
			this.selected_unit = this.selector;
    }
  }
	
  ngOnInit() {
  }
	
  changeUnit(){
  }
	
	convertValue(currentUnit, newUnit){
		// Add error prevention for custom units (check to verify that both currentUnit and newUnit are present in the units array)
		let result;
		currentUnit = currentUnit.trim();
		newUnit = newUnit.trim();
		
		if (this.domain == 'steps') { // average step distance = 2.5 feet 
			if (currentUnit == 'mile') {
				if (newUnit == 'km') {
					result = this.input_value * 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.input_value * 5280 / 2.5;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'km') {
				if (newUnit == 'mile') {
					result = this.input_value / 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.input_value * 3280.8 / 2.5;
					return result.toFixed(2);
				}
			} else {  // currentUnit = 'steps'
				if (newUnit == 'mile') {
					result = this.input_value * 2.5 / 5280;
					return result.toFixed(2);
				} else if (newUnit == 'km') {
					result = this.input_value * 2.5 / 3280.8; 
					return result.toFixed(2);
				}
			}
			
		} else if (this.domain == 'music') { // Average song playtime = 3.5 minutes
			if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					result = this.input_value / 60;
					return result.toFixed(2);
				} else if (newUnit == 'times') {
					result = this.input_value / 3.5;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					result = this.input_value * 60;
					return result.toFixed(2);
				} else if (newUnit == 'times') {
					result = this.input_value * 60 / 3.5;
					return result.toFixed(2);
				}
				
			} else if (currentUnit == 'times') {
				if (newUnit == 'minutes') {
					result = this.input_value * 3.5;
					return result.toFixed(2);
				} else if (newUnit == 'hours') {
					result = this.input_value * 3.5 / 60;
					return result.toFixed(2);
				}
			}
			
		} else {	// time
			if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					result = this.input_value * 60;
					return result.toFixed(2);
				} else if (newUnit == 'days') {
					result = this.input_value / 24; 
					return result.toFixed(2);
				}
			} else if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					result = this.input_value / 60;
					return result.toFixed(2);
				} else if (newUnit == 'days') {
					result = this.input_value / 60 / 24;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'days') {
				if (newUnit == 'minutes') {
					result = this.input_value * 24 * 60;
					return result.toFixed(2);
				} else if (newUnit == 'hours') {
				result = this.input_value * 24;
					return result.toFixed(2);
				}
			}
		}
	}
	
  addGoal(){
    if(this.goal == "REMOVE"){
      this.goal = "ADD GOAL";
    }
    else{
			// Error prevention 
			if (this.selected_unit == undefined) {
				this.presentErrorPrompt();
				return;
			} else if (this.input_value <= 0 || this.input_value == undefined) {
				this.presentErrorPrompt2();
				return;
			}
      this.goal = "REMOVE";
			if (this.domain == "music") {
				this.goal_str = this.input_value
				this.music_str = this.selected_unit + ' of ' + this.music_input_value;
			} else {
				this.goal_str = this.input_value;
			}
    }
  }
	
	updateGoal() {
		if (this.goal == "REMOVE") {
			if (this.domain == "music") {
				this.goal_str = this.input_value + ' ' + this.selected_unit + ' of ' + this.music_input_value;
			} else {
				this.goal_str = this.input_value;
			}
		}
	}
	
  customUnit(selector){
    if (selector == "custom"){
      this.presentPrompt();
    }
		if (this.selected_unit != undefined) {
			// Save the value so that conversions don't mess up original input (mostly for steps) 
			if (this.saved_value == undefined) {
				this.saved_value = this.input_value;
				this.saved_unit = this.selected_unit;
			} else {
				if (this.selector == this.saved_unit) {
					this.input_value = this.saved_value;
					this.selected_unit = this.selector;
					return;
				}
			}
			console.log("calling convertValue");
			this.input_value = this.convertValue(this.selected_unit, this.selector)
		} else {
			console.log("undefined");
		}
		this.selected_unit = this.selector;
  }
	
	/*customMusicUnit(music_unit) {
		if (music_unit == "custom"){
			this.presentMusicPrompt();
		}
		this.music_selector = music_unit;
	}*/
	
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
						this.unit.push(data.name);
						this.selector = data.name;
          }
        }
      ]
    });
    await alert.present();
  }
	
	async presentErrorPrompt() {
		const alert = await this.alertController.create({
			header: 'Error: select units with the drop-down menu before adding a goal',
			buttons: [
				{
					text: 'Got It!',
				}
			]
		});
		await alert.present();
	}
	
	async presentErrorPrompt2() {
		const alert = await this.alertController.create({
			header: 'Error: Amount must be greater than 0',
			buttons: [
				{
					text: 'Got It!',
				}
			]
		});
		await alert.present();
	}
	
	
	// Bindings to click events for animation buttons
	pulseAnimation() {
		if (this.pulse == false) { // activate pulse animation
			this.pulse == true; 
			
		} else {								   // deactivate
			this.pulse == false;
			
		}
	}
	shakeAnmiation() {
		if (this.shake == false) { // activate shake animation
			this.shake == true; 
			
		} else {								   // deactivate
			this.shake == false;
			
		}
	}
	fillAnimation() {
		if (this.fill == false) { // activate fill animation
			this.fill == true; 
			
		} else {								  // deactivate
			this.fill == false;
			
		}
	}
	countAnimation() {
		if (this.countUp == false) { // activate count up animation
			this.countUp == true; 
		} else {								     // deactivate
			this.countUp == false;
		}
	}	
	
	// Binding to sharesheet button 
	shareButton() {}
	
}