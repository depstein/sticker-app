import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from './../global-data.service';

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
	music_selector:string;
	
  constructor(public alertController: AlertController, public route: ActivatedRoute, public global: GlobalDataService ) {
    this.custom = "custom";
    this.goal = "ADD GOAL"; 
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.input_value = 0;
		this.slider_input_value = 0;
		this.music_input_value = "The Beatles";
		this.goal_str = '';
		
		this.unit_list = Object.keys(this.global.domain_info[this.domain].units);
		this.unit_copy = this.unit_list;
		this.unit_selector = this.unit_list[0].trim();
		this.selected_unit = this.unit_selector;
		this.max_slider_value = this.global.domain_info[this.domain].units[this.selected_unit].maxAmount;
		this.slider_image_url = this.global.domain_info[this.domain].slider_image_url;
  }
	
  ngOnInit() {}
	
	// Updates input value from child component
	onInputChange(newValue: number) {
		this.input_value = newValue;
		this.slider_input_value = newValue;
		if (this.goal == "REMOVE") {	// If a goal has been created it must be updated
			if (this.domain == "music") {
				this.goal_str = this.input_value + ' ' + this.selected_unit + ' of ' + this.music_input_value;
			} else {
				this.goal_str = this.input_value;
			}
		}
	}
	
	// Updates unit value from child component
	onUnitChange(newUnit: string) {
		this.selected_unit = newUnit;
	}
	
	// Binding to onClick event of sharesheet button 
	shareButton() {}  
	
	addToRecentUse(){
		this.global.recent_use.push(this.image);
		if(this.global.recent_use.length > 3){
			this.global.recent_use = this.global.recent_use.slice(1,4);
		}
	}
}