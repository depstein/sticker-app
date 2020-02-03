import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-heartrate',
  templateUrl: './heartrate.page.html',
  styleUrls: ['./heartrate.page.scss'],
})
export class HeartratePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	
	goToCreateStickerPage() {
		this.navCtrl.navigateForward('/create-sticker');
	}

}
