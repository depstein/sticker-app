import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	
	goToCreateStickerPage() {
		this.navCtrl.navigateForward('/create-sticker');
	}

}
