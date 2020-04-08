import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from './sticker-info-class';

@Component({
  selector: "app-create-stickers",
  templateUrl: "./create-stickers.page.html",
  styleUrls: ["./create-stickers.page.scss"]
})
export class CreateStickersPage implements OnInit {
  unit_selector: any;					// Selected unit
  image: string;
  domain: string;
	input_value: number;				// Input value		 
	music_input_value: string;	// Secondary input value for music domain
	animation: string;					// Selected animation (none by default)
	hasGoal: boolean;
	
	stickerInfo: StickerInfo;
	
  constructor(public alertController: AlertController, public route: ActivatedRoute, public global: GlobalDataService ) {
    this.image = this.route.snapshot.paramMap.get("img");
    this.domain = this.route.snapshot.paramMap.get("domain");
		this.input_value = 0;
		this.music_input_value = "The Beatles";
		this.animation = "none";
		this.hasGoal = false;
		this.unit_selector = Object.keys(this.global.domain_info[this.domain].units)[0].trim();
  }
	
	ngOnInit() {
		this.stickerInfo = new StickerInfo(this.image, this.domain, this.input_value, this.unit_selector, this.animation, this.hasGoal)

		if (this.domain == "music") {
				this.stickerInfo.music_value = this.music_input_value;
		}
	}
	
	// Updates input value from input component
	onInputChange(newValue: number) {
		this.input_value = newValue;
		this.stickerInfo.value = newValue;
		console.log(this.stickerInfo);
	}
	
	// Updates music input value from input component
	onMusicInputChange(newValue: string) {
		this.music_input_value = newValue;
		this.stickerInfo.music_value = newValue;
		console.log(this.stickerInfo);
	}
	
	// Updates unit value from input component
	onUnitChange(newUnit: string) {
		this.unit_selector = newUnit;
		this.stickerInfo.unit = newUnit;
		console.log(this.stickerInfo);
	}

	// Updates goal boolean from input component
	onGoalChange(goal: boolean) {
		this.hasGoal = goal;
		this.stickerInfo.hasGoal = goal;
		console.log(this.stickerInfo);
	}

	// Updates animation selection from animation-buttons component
	onAnimationChange(newAnimation: string) {
		this.animation = newAnimation;
		this.stickerInfo.animation = newAnimation;
		console.log(this.stickerInfo);
	}
	
	// Binding to onClick event of sharesheet button 

	
	addToRecentUse(){
		if( !this.global.recent_use.includes(this.image) ){
			this.global.recent_use.push(this.image);
		}
		
		if(this.global.recent_use.length > 3){
			this.global.recent_use = this.global.recent_use.slice(1,4);
		}
	}


}
