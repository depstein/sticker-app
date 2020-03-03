import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {
	imageArray = [];
	
  constructor(private navCtrl: NavController, private router: Router) { 		
		this.imageArray = [
			[
				"../../../assets/stickers/time/5-02.png",
				"../../../assets/stickers/time/5-01.png",
				"../../../assets/stickers/time/5-06.png"
			],
			[
				"../../../assets/stickers/time/5-03.png",
				"../../../assets/stickers/time/embellished-10.png",
				"../../../assets/stickers/time/plain-09.png"
			],
			[
				"../../../assets/stickers/time/5-09.png",
				"../../../assets/stickers/time/plain-02.png",
				"../../../assets/stickers/time/5-12.png"
			],
			[
				"../../../assets/stickers/time/embellished-03.png",
				"../../../assets/stickers/time/5-08.png",
				"../../../assets/stickers/time/plain-12.png"
			],
			[
				"../../../assets/stickers/time/5-07.png",
				"../../../assets/stickers/time/plain-09.png",
				"../../../assets/stickers/time/embellished-08.png"
			],
			[
				"../../../assets/stickers/time/5-02.png",
				"../../../assets/stickers/time/5-01.png", 
				"../../../assets/stickers/time/5-06.png"
			]
		];
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"time"}])
		
	}

}
