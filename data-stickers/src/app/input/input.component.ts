import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalDataService } from './../global-data.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	unit_list: any[] = [];
	unit_copy: any[] = [];	// Used for slider's *ngIf to check for custom unit
	selected_unit: string;
	custom: string;
  	goal: string;
	goal_str: string;
	saved_value: number;
	saved_unit: string;
	max_slider_value: number;
	slider_input_value:number;
	slider_image_url: string;
	music_str: string;
	
	constructor(public alertController: AlertController, public global: GlobalDataService) {
		this.slider_input_value = 0;
		this.goal_str = '';
		this.goal = "ADD GOAL";
		this.custom = "custom";
	}

	ngOnInit() {
		this.unit_list = this.unit_copy = Object.keys(this.global.domain_info[this.global.stickerInfo.domain].units);
		this.selected_unit = this.unit_list[0].trim();
		this.max_slider_value = this.global.domain_info[this.global.stickerInfo.domain].units[this.global.stickerInfo.unit].maxAmount;
		this.slider_image_url = this.global.domain_info[this.global.stickerInfo.domain].slider_image_url;
	}
	
	// Called to calculate unit conversions when the selected unit is changed 
	convertValue(currentUnit, newUnit) {
		if (!this.unit_list.includes(currentUnit) || !this.unit_list.includes(newUnit)) {
			return 0;
		}
		let result;
		currentUnit = currentUnit.trim();
		newUnit = newUnit.trim();
		
		if (this.global.stickerInfo.domain == 'steps') { // average step distance = 2.5 feet 
			if (currentUnit == 'miles') {
				if (newUnit == 'km') {
					result = this.global.stickerInfo.value * 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.global.stickerInfo.value * 5280 / 2.5;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'km') {
				if (newUnit == 'miles') {
					result = this.global.stickerInfo.value / 1.60934;
					return result.toFixed(2);
				} else if (newUnit == 'steps') {
					result = this.global.stickerInfo.value * 3280.8 / 2.5;
					return result.toFixed(2);
				}
			} else {  // currentUnit = 'steps'
				if (newUnit == 'miles') {
					result = this.global.stickerInfo.value * 2.5 / 5280;
					return result.toFixed(2);
				} else if (newUnit == 'km') {
					result = this.global.stickerInfo.value * 2.5 / 3280.8; 
					return result.toFixed(2);
				}
			}
			
		} else if (this.global.stickerInfo.domain == 'music') { // Average song playtime = 3.5 minutes
			if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					result = this.global.stickerInfo.value / 60;
					return result.toFixed(2);
				} else if (newUnit == 'times') {
					result = this.global.stickerInfo.value / 3.5;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					result = this.global.stickerInfo.value * 60;
					return result.toFixed(2);
				} else if (newUnit == 'times') {
					result = this.global.stickerInfo.value * 60 / 3.5;
					return result.toFixed(2);
				}
				
			} else if (currentUnit == 'times') {
				if (newUnit == 'minutes') {
					result = this.global.stickerInfo.value * 3.5;
					return result.toFixed(2);
				} else if (newUnit == 'hours') {
					result = this.global.stickerInfo.value * 3.5 / 60;
					return result.toFixed(2);
				}
			}
			
		} else {	// time
			if (currentUnit == 'hours') {
				if (newUnit == 'minutes') {
					result = this.global.stickerInfo.value * 60;
					return result.toFixed(2);
				} else if (newUnit == 'days') {
					result = this.global.stickerInfo.value / 24; 
					return result.toFixed(2);
				}
			} else if (currentUnit == 'minutes') {
				if (newUnit == 'hours') {
					result = this.global.stickerInfo.value / 60;
					return result.toFixed(2);
				} else if (newUnit == 'days') {
					result = this.global.stickerInfo.value / 60 / 24;
					return result.toFixed(2);
				}
			} else if (currentUnit == 'days') {
				if (newUnit == 'minutes') {
					result = this.global.stickerInfo.value * 24 * 60;
					return result.toFixed(2);
				} else if (newUnit == 'hours') {
				result = this.global.stickerInfo.value * 24;
					return result.toFixed(2);
				}
			}
		}
	}

	// Bound to onChange event for input box 
	updateInputValue() {
		this.slider_input_value = this.global.stickerInfo.value;
		if (this.goal == "REMOVE") {	// If a goal has been created it must be updated
			if (this.global.stickerInfo.domain == "music") {
				this.goal_str = String(this.global.stickerInfo.value) + ' ' + this.selected_unit + ' of ' + String(this.global.stickerInfo.music_value);
			} else {
				this.goal_str = String(this.global.stickerInfo.value);
			}
		}
	}
	
	// Bound to onChange event for music input box
	updateMusicInputValue() {}
	
	// Bound to onChange event for the unit selector 
  	unitChanged(unit_selector) {
		if (unit_selector == "custom"){
			this.presentCustomUnitPrompt();
		}
		if (this.selected_unit != undefined) {
			// Saves the value so that conversions don't mess up original input (mostly for steps) 
			if (this.saved_value == undefined) {
					this.saved_value = this.global.stickerInfo.value;
					this.saved_unit = this.selected_unit;
			} else {
				if (this.global.stickerInfo.unit == this.saved_unit) {
					this.global.stickerInfo.value = this.saved_value;
					this.selected_unit = this.saved_unit;
					this.updateInputValue();
					this.max_slider_value = this.global.domain_info[this.global.stickerInfo.domain].units[this.selected_unit].maxAmount;
					return;
				}
			}
			this.global.stickerInfo.value = this.convertValue(this.selected_unit, this.global.stickerInfo.unit)
		}
		this.updateInputValue();
		this.selected_unit = this.global.stickerInfo.unit;

		if (this.unit_copy.includes(this.selected_unit)) {
			this.max_slider_value = this.global.domain_info[this.global.stickerInfo.domain].units[this.selected_unit].maxAmount;
		}
  	}
	
	// Bound to onChange event for slider
	updateInputValueFromSlider() {
		if (this.slider_input_value >= 0 && this.slider_input_value <= this.max_slider_value) {
			this.global.stickerInfo.value = this.slider_input_value; 
		}
	}

	// Bound to click event for add/remove goal button
	toggleGoal() {
		if (this.goal == "REMOVE") {
			this.goal = "ADD GOAL";
			this.global.stickerInfo.hasGoal = false;
		}
		else {
			// Error prevention 
			if (this.global.stickerInfo.value <= 0 || this.global.stickerInfo.value == undefined) {
				this.presentErrorPrompt();
				return;
			} else if (isNaN(this.global.stickerInfo.value)) {
				this.presentErrorPrompt2();
				return;
			}

			this.goal = "REMOVE";
			this.global.stickerInfo.hasGoal = true;
			if (this.global.stickerInfo.domain == "music") {
				this.goal_str = String(this.global.stickerInfo.value);
				this.music_str = this.selected_unit + ' of ' + String(this.global.stickerInfo.music_value);
			} else {
				this.goal_str = String(this.global.stickerInfo.value);
			}
		}
	}

	cancelledCustomUnitInput() {
		this.global.stickerInfo.unit = this.unit_list[0];
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
						this.cancelledCustomUnitInput();
					}
				}, {
					text: 'OK',
					handler: data => {
						this.unit_list.push(data.name);
						this.global.stickerInfo.unit = data.name;
					}
				}
      		]
    	});
    	await alert.present();
	}

	async presentErrorPrompt() {
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

	async presentErrorPrompt2() {
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
}