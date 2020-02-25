import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {
	img1: any;
	img2: any;
	img3: any;
	img4: any;
	img5: any;
	img6: any;
	img7: any;
	img8: any;
	img9: any;
	img10: any;
	img11: any;
	img12: any;

  constructor(private navCtrl: NavController, private router: Router) { 
		this.img1 = "../../../assets/stickers/calories/4-06.png";
		this.img2 = "../../../assets/stickers/calories/8-03.png";
		this.img3 = "../../../assets/stickers/calories/plain-14.png";
		this.img4 = "../../../assets/stickers/calories/plain-03.png";
		this.img5 = "../../../assets/stickers/calories/embellished-14.png";
		this.img6 = "../../../assets/stickers/calories/8-12.png";
		this.img7 = "../../../assets/stickers/calories/8-01.png";
		this.img8 = "../../../assets/stickers/calories/8-06.png";
		this.img9 = "../../../assets/stickers/calories/embellished-11.png";
		this.img10 = "../../../assets/stickers/calories/plain-10.png";
		this.img11 = "../../../assets/stickers/calories/4-07.png";
		this.img12 = "../../../assets/stickers/calories/embellished-01.png";
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"calories"}])
	}

}
