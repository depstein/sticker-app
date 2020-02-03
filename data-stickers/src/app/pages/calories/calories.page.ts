import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	
	goToCreateStickerPage() {
		this.navCtrl.navigateForward('/create-sticker');
	}

}
