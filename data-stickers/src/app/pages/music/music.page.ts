import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	
	goToCreateStickerPage() {
		this.navCtrl.navigateForward('/create-sticker');
	}

}
