import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	// Documentation for binding variables between parent/child components: https://angular.io/guide/component-interaction
	@Input() unit_selector;
	@Output() unit_changed = new EventEmitter<string>();
	@Input() custom;
	@Input() input_value;
	@Output() input_changed = new EventEmitter<number>();
	@Input() slider_input_value;
	@Input() max_slider_value;
	@Input() slider_image_url;
	@Input() music_input_value;
	@Input() selected_unit;	// Used for error prevention
	@Input() domain;
	@Input() unit_list;
	@Input() unit_copy;
	@Input() music_selector;
	@Input() domain_info;
	@Input() goal;
	@Input() goal_str;
	@Input() saved_value;
	@Input() saved_unit;

	music_str: string;
	
  constructor(public alertController: AlertController) {}

  ngOnInit() {}
	
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

	// Bound to onChange event for input box 
	updateInputValue() {
		this.slider_input_value = this.input_value;
		this.input_changed.emit(this.input_value);
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
			} else {
				if (this.unit_selector == this.saved_unit) {
					this.input_value = this.saved_value;
					this.selected_unit = this.saved_unit;
					this.updateInputValue();
					this.unit_changed.emit(this.selected_unit);
					return;
				}
			}
			this.input_value = this.convertValue(this.selected_unit, this.unit_selector)
		}
		this.updateInputValue();
		this.selected_unit = this.unit_selector;
		if (this.unit_copy.includes(this.selected_unit)) {
			this.max_slider_value = this.domain_info[this.domain].units[this.selected_unit].maxAmount;
			this.slider_image_url = this.domain_info[this.domain].slider_image_url;
		}
		this.unit_changed.emit(this.selected_unit);
  }
	
	// Bound to onChange event for slider
	updateInputValueFromSlider() {
		if (this.slider_input_value >= 0 && this.slider_input_value <= this.max_slider_value) {
			this.input_value = this.slider_input_value; 
		}
	}

	// Bound to click event for add/remove goal button
	toggleGoal() {
		if (this.goal == "REMOVE") {
			this.goal = "ADD GOAL";
		}
		else {
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
			} else if (this.selected_unit == 'custom') {
				this.presentErrorPrompt4();
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

	async presentErrorPrompt4() {
		const alert = await this.alertController.create({
			header: 'Error: Must specify units before creating goal',
			buttons: [
				{
					text: 'Got It!',
				}
			]
		});
		await alert.present();
	}

}
