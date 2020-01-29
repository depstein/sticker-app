import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	
	goToCreateStickerPage() {
		this.navCtrl.navigateForward('/create-sticker');
	}

}
