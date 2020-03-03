import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {
	imageArray = [];

  constructor(private navCtrl: NavController, private router: Router) { 
		this.imageArray = [
			[
				"../../../assets/stickers/calories/4-06.png",
				"../../../assets/stickers/calories/8-03.png",
				"../../../assets/stickers/calories/plain-14.png"
			],
			[
				"../../../assets/stickers/calories/plain-03.png",
				"../../../assets/stickers/calories/embellished-14.png",
				"../../../assets/stickers/calories/8-12.png"
			],
			[
				"../../../assets/stickers/calories/8-01.png",
				"../../../assets/stickers/calories/8-06.png",
				"../../../assets/stickers/calories/embellished-11.png"
			],
			[
				"../../../assets/stickers/calories/plain-10.png",
				"../../../assets/stickers/calories/4-07.png",
				"../../../assets/stickers/calories/embellished-01.png"
			],
			[
				"../../../assets/stickers/calories/4-06.png",
				"../../../assets/stickers/calories/8-03.png",
				"../../../assets/stickers/calories/plain-14.png"
			],
			[
				"../../../assets/stickers/calories/plain-03.png",
				"../../../assets/stickers/calories/embellished-14.png",
				"../../../assets/stickers/calories/8-12.png"
			]
		];
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"calories"}])
	}

}
