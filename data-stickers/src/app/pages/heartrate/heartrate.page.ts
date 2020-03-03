import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-heartrate',
  templateUrl: './heartrate.page.html',
  styleUrls: ['./heartrate.page.scss'],
})
export class HeartratePage implements OnInit {
	imageArray = [];
	
  constructor(private navCtrl: NavController, private router: Router) {
		this.imageArray = [
			[
				"../../../assets/stickers/heart rate/embellished-05.png",
				"../../../assets/stickers/heart rate/7-09.png",
				"../../../assets/stickers/heart rate/7-07.png"
			],
			[
				"../../../assets/stickers/heart rate/7-04.png",
				"../../../assets/stickers/heart rate/plain-04.png",
				"../../../assets/stickers/heart rate/7-03.png"
			],
			[
				"../../../assets/stickers/heart rate/7-07.png",
				"../../../assets/stickers/heart rate/embellished-15.png",
				"../../../assets/stickers/heart rate/7-12.png"
			],
			[
				"../../../assets/stickers/heart rate/plain-15.png",
				"../../../assets/stickers/heart rate/7-08.png",
				"../../../assets/stickers/heart rate/bpm.png"
			],
			[
				"../../../assets/stickers/heart rate/05.png",
				"../../../assets/stickers/heart rate/7-09.png",
				"../../../assets/stickers/heart rate/7-07.png"
			],
			[
				"../../../assets/stickers/heart rate/7-04.png",
				"../../../assets/stickers/heart rate/plain-04.png", 
				"../../../assets/stickers/heart rate/7-03.png"
			]
		];
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"heartrate"}])
	}

}
