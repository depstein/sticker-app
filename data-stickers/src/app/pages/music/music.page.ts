import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
	imageArray = [];

  constructor(private navCtrl: NavController, private router: Router) { 	
		this.imageArray = [
			[
				"../../../assets/stickers/music/6-09.png",
				"../../../assets/stickers/music/plain-06.png",
				"../../../assets/stickers/music/6-12.png"
			],
			[
				"../../../assets/stickers/music/6-02.png",
				"../../../assets/stickers/music/embellished-12.png",
				"../../../assets/stickers/music/embellished-07.png"
			],
			[
				"../../../assets/stickers/music/plain-13.png",
				"../../../assets/stickers/music/6-10.png",
				"../../../assets/stickers/music/plain-05.png"
			],
			[
				"../../../assets/stickers/music/6-01.png",
				"../../../assets/stickers/music/6-08.png",
				"../../../assets/stickers/music/embellished-04.png"
			],
			[
				"../../../assets/stickers/music/6-01.png",
				"../../../assets/stickers/music/6-08.png",
				"../../../assets/stickers/music/embellished-04.png"
			],
			[
				"../../../assets/stickers/music/6-06.png",
				"../../../assets/stickers/music/6-03.png", 
				"../../../assets/stickers/music/plain-05.png"
			]
		];
	}
	
  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"music"}])
	}

}
