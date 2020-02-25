import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {
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
		this.img1 = "../../../assets/stickers/steps/2-02.png";
		this.img2 = "../../../assets/stickers/steps/plain-01.png";
		this.img3 = "../../../assets/stickers/steps/track-11.png";
		this.img4 = "../../../assets/stickers/steps/plain-18.png";
		this.img5 = "../../../assets/stickers/steps/rhino-28.png";
		this.img6 = "../../../assets/stickers/steps/embellished-09.png";
		this.img7 = "../../../assets/stickers/steps/2-12.png";
		this.img8 = "../../../assets/stickers/steps/2-14.png";
		this.img9 = "../../../assets/stickers/steps/plain-07.png";
		this.img10 = "../../../assets/stickers/steps/foot.png";
		this.img11 = "../../../assets/stickers/steps/embellished-13.png";
		this.img12 = "../../../assets/stickers/steps/giraffe-08.png";
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"steps"}])
	}

}
