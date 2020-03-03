import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {
	imageArray = [];

  constructor(private navCtrl: NavController, private router: Router) { 		
		this.imageArray = [
			[
				"../../../assets/stickers/steps/2-02.png",
				"../../../assets/stickers/steps/plain-01.png",
				"../../../assets/stickers/steps/track-11.png"
			],
			[
				"../../../assets/stickers/steps/plain-18.png",
				"../../../assets/stickers/steps/rhino-28.png",
				"../../../assets/stickers/steps/embellished-09.png"
			],
			[
				"../../../assets/stickers/steps/2-12.png",
				"../../../assets/stickers/steps/2-14.png",
				"../../../assets/stickers/steps/plain-07.png"
			],
			[
				"../../../assets/stickers/steps/foot.png",
				"../../../assets/stickers/steps/embellished-13.png",
				"../../../assets/stickers/steps/giraffe-08.png"
			],
			[
				"../../../assets/stickers/steps/2-02.png",
				"../../../assets/stickers/steps/plain-01.png",
				"../../../assets/stickers/steps/track-11.png"
			],
			[
				"../../../assets/stickers/steps/plain-18.png",
				"../../../assets/stickers/steps/rhino-28.png",
				"../../../assets/stickers/steps/embellished-09.png"
			]
		];
		
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"steps"}])
	}

}
