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
	unit_selector:any;
	custom:any;
	goal:any;
	image:string;
	domain:string;
	unit_list:any[] = [];
	unit_copy:any[] = [];	// Used for slider's *ngIf to check for custom unit
	input_value:number;
	slider_input_value:number;
	max_slider_value:number;
	slider_image_url:string;
	music_input_value:string;
	selected_unit:string;	// Used for error prevention
	goal_str:any;
	music_units:any[] = [];
	music_selector:string;
	pulse:boolean;
	music_str:string;
	saved_value:number;	// Used to save initial input value (for steps conversions) 
	saved_unit:string;	// Same as above
	domain_info = {}; 
	
  constructor(public alertController: AlertController, public route: ActivatedRoute) {
		this.custom = "custom";
		this.goal = "ADD GOAL"; 
		this.image = this.route.snapshot.paramMap.get("img");
		this.domain = this.route.snapshot.paramMap.get("domain");
		this.input_value = 0;
		this.slider_input_value = 0;
		this.music_input_value = "The Beatles";
		this.goal_str = '';
		this.music_units = ['songs', 'albums', 'artists']; 
		this.domain_info = {
			"steps": {
				"units": {
					"steps": {
						"maxAmount": 10000
					},
					"miles": {
						"maxAmount": 100
					},
					"km": {
						"maxAmount": 100
					}
				},
				"slider_image_url": "../../assets/icon/footprint.svg"
			},
			"heartrate": {
				"units": {
					"bpm": {
						"maxAmount": 100
					}
				},
				"slider_image_url": "../../assets/icon/bxs-heart.svg"
			},
			"calories": {
				"units": {
					"calories": {
						"maxAmount": 10000
					}
				},
				"slider_image_url": "../../assets/icon/bxs-hot.svg"
			},
			"time": {
				"units": {
					"hours": {
						"maxAmount": 24
					},
					"minutes": {
						"maxAmount": 60
					},
					"days": {
						"maxAmount": 14
					}
				},
				"slider_image_url": "../../assets/icon/bxs-time-five.svg"
			},
			"music": {
				"units": {
					"minutes": {
						"maxAmount": 60
					},
					"hours": {
						"maxAmount": 24
					},
					"plays": {
						"maxAmount": 50
					}
				},
				"slider_image_url": "../../assets/icon/bxs-music.svg"
			}
		}		  
		this.unit_list = Object.keys(this.domain_info[this.domain].units);
		this.unit_copy = this.unit_list;
		this.unit_selector = this.unit_list[0].trim();
		this.selected_unit = this.unit_selector;
		this.max_slider_value = this.domain_info[this.domain].units[this.selected_unit].maxAmount;
		this.slider_image_url = this.domain_info[this.domain].slider_image_url;
		console.log(this.slider_image_url);
  }
	
  ngOnInit() {
  }

	// Called to calculate unit conversions when the selected unit is changed 
	convertValue(currentUnit, newUnit){
		if (!this.unit_list.includes(currentUnit) || !this.unit_list.includes(newUnit)) {
			return 0;
		}
		let result;
		currentUnit = currentUnit.trim();
		newUnit = newUnit.trim();
		
		if (this.domain == 'steps') { // average step distance = 2.5 feet 
			if (currentUnit == 'miles') {
				if (newUnit == 'km') {
					result = this.input_value * 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.input_value * 5280 / 2.5;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'km') {
				if (newUnit == 'miles') {
					result = this.input_value / 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.input_value * 3280.8 / 2.5;
					return result.toFixed(2);
				}
			} else {  // currentUnit = 'steps'
				if (newUnit == 'miles') {
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
	
	// Bound to click event for add/remove goal button
  toggleGoal(){
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
			} else if (isNaN(this.input_value)) {
				this.presentErrorPrompt3();
				return;
			}
			
      		this.goal = "REMOVE";
			if (this.domain == "music") {
				this.goal_str = this.input_value;
				this.music_str = this.selected_unit + ' of ' + this.music_input_value;
			} else {
				this.goal_str = this.input_value;
			}
    }
  }
	
	// Bound to onChange event for input box 
	updateInputValue() {
		if (this.goal == "REMOVE") {	// If a goal has been created it must be updated
			if (this.domain == "music") {
				this.goal_str = this.input_value + ' ' + this.selected_unit + ' of ' + this.music_input_value;
			} else {
				this.goal_str = this.input_value;
			}
		}
		this.slider_input_value = this.input_value;
	}
	
	// Bound to onChange event for the unit selector 
  unitChanged(unit_selector){
    if (unit_selector == "custom"){
      this.presentCustomUnitPrompt();
    }
	if (this.selected_unit != undefined) {
		// Saves the value so that conversions don't mess up original input (mostly for steps) 
		if (this.saved_value == undefined) {
			this.saved_value = this.input_value;
			this.saved_unit = this.selected_unit;
		//	console.log(this.saved_value);
		//	console.log(this.saved_unit);
		} else {
			if (this.unit_selector == this.saved_unit) {
				this.input_value = this.saved_value;
				this.selected_unit = this.saved_unit;
				this.updateInputValue();
				return;
			}
		}
		this.input_value = this.convertValue(this.selected_unit, this.unit_selector)
	}
	this.updateInputValue();
	this.selected_unit = this.unit_selector;
	this.max_slider_value = this.domain_info[this.domain].units[this.selected_unit].maxAmount;
	this.slider_image_url = this.domain_info[this.domain].slider_image_url;
  }
	
	// Bound to onChange event for slider
	updateInputValueFromSlider() {
		if (this.slider_input_value >= 0 && this.slider_input_value <= this.max_slider_value) {
			this.input_value = this.slider_input_value; 
		}
	}
	
  async presentCustomUnitPrompt() {
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
						this.unit_list.push(data.name);
						this.unit_selector = data.name;
          }
        }
      ]
    });
    await alert.present();
  }
	
	async presentCustomMusicUnitPrompt() {
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
						this.music_units.push(data.name);
						this.music_selector = data.name;
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
	
	async presentErrorPrompt3() {
		const alert = await this.alertController.create({
			header: 'Error: Amount must be numeric',
			buttons: [
				{
					text: 'Got It!',
				}
			]
		});
		await alert.present();
	}
	
	pulseAnimation() {
		// Variable to toggle the animation
		if (this.pulse == false) { // activate pulse animation
			this.pulse = true; 
			
		} else {								   // deactivate
			this.pulse = false;
			
		}
	}
	shakeAnmiation() {}
	fillAnimation() {}
	countAnimation() {}	
	// Binding to onClick event of sharesheet button 
	shareButton() {}  
	
}