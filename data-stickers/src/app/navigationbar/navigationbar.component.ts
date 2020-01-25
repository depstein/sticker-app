import { Component, OnInit } from '@angular/core';

import { StepsPage } from '../pages/steps/steps.page';
import { HeartratePage } from '../pages/heartrate/heartrate.page';
import { CaloriesPage } from '../pages/calories/calories.page';
import { MusicPage } from '../pages/music/music.page';
import { TimePage } from '../pages/time/time.page';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss'],
})
export class NavigationbarComponent implements OnInit {

  constructor(private navCtrl: NavController, private router: Router) {}
  
  ngOnInit() {}
	
	goToStepsPage() {
		this.navCtrl.navigateForward('/steps');
	}
	
  goToHeartratePage() {
		this.navCtrl.navigateForward('/heartrate');
  }
	goToCaloriesPage() {
		this.navCtrl.navigateForward('/calories');
	}
	
	goToMusicPage() {
		this.navCtrl.navigateForward('/music');
	}
	
	goToTimePage() {
		this.navCtrl.navigateForward('/time');
	}
	
}
