import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {
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
	img12:any;
	img13:any;
	img14:any;
	img15:any;
	img16:any;
	img17:any;
	img18:any;
	image = {};
  constructor(private navCtrl: NavController, private router: Router) { 
		this.img1 = "../../../assets/stickers/time/5-02.png";
		this.img2 = "../../../assets/stickers/time/5-01.png";
		this.img3 = "../../../assets/stickers/time/5-06.png";
		this.img4 = "../../../assets/stickers/time/5-03.png";
		this.img5 = "../../../assets/stickers/time/embellished-10.png";
		this.img6 = "../../../assets/stickers/time/plain-09.png";
		this.img7 = "../../../assets/stickers/time/5-09.png";
		this.img8 = "../../../assets/stickers/time/plain-02.png";
		this.img9 = "../../../assets/stickers/time/5-12.png";
		this.img10 = "../../../assets/stickers/time/embellished-03.png";
		this.img11 = "../../../assets/stickers/time/5-08.png";
    	this.img12 = "../../../assets/stickers/time/plain-12.png";
    	this.img13 = "../../../assets/stickers/time/5-07.png";
	  	this.img14 ="../../../assets/stickers/time/plain-09.png";
	  	this.img15 = "../../../assets/stickers/time/embellished-08.png";
	  	this.img16 = "../../../assets/stickers/time/5-02.png";
	  	this.img17 = "../../../assets/stickers/time/5-01.png"; 
		this.img18 = "../../../assets/stickers/time/5-06.png";
	
	}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"time"}])
		
	}

}
