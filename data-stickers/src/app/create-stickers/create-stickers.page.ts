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
	music_selector:string;
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
	
}