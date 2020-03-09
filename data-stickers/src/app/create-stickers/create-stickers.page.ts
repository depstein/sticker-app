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
  image:string;
  domain:string;
	input_value:number;		 
	slider_input_value:number;
	music_input_value: string;
	// Need to add a variable for which animation is selected and bind it to the animation-buttons component
	
  constructor(public alertController: AlertController, public route: ActivatedRoute, public global: GlobalDataService ) {
    this.custom = "custom";
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.input_value = 0;
		this.slider_input_value = 0;
		this.music_input_value = "The Beatles";
  }
	
  ngOnInit() {}
	
	// Updates input value from child component
	onInputChange(newValue: number) {
		this.input_value = newValue;
		this.slider_input_value = newValue;
	}
	
	// Updates unit value from child component
	onUnitChange(newUnit: string) {
		this.unit_selector = newUnit;
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