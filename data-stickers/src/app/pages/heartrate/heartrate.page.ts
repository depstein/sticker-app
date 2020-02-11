import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-heartrate',
  templateUrl: './heartrate.page.html',
  styleUrls: ['./heartrate.page.scss'],
})
export class HeartratePage implements OnInit {
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
	img13: any;
	img14: any;
	img15: any;
	img16: any;
	img17: any;
	img18: any;
	
  constructor(private navCtrl: NavController, private router: Router) {
		this.img1 = "../../../assets/stickers/heart rate/embellished-05.png" 
		this.img2 = "../../../assets/stickers/heart rate/7-09.png";
		this.img3 = "../../../assets/stickers/heart rate/7-07.png" ;
		this.img4 = "../../../assets/stickers/heart rate/7-04.png" ;
		this.img5 = "../../../assets/stickers/heart rate/plain-04.png" ;
		this.img6 = "../../../assets/stickers/heart rate/7-03.png";
		this.img7 = "../../../assets/stickers/heart rate/7-07.png";
		this.img8 = "../../../assets/stickers/heart rate/embellished-15.png" ;
		this.img9 = "../../../assets/stickers/heart rate/7-12.png";
		this.img10 = "../../../assets/stickers/heart rate/plain-15.png";
		this.img11 = "../../../assets/stickers/heart rate/7-08.png";
		this.img12 = "../../../assets/stickers/heart rate/bpm.png";
		this.img13 = "../../../assets/stickers/heart rate/05.png";
		this.img14 = "../../../assets/stickers/heart rate/7-09.png"; 
		this.img15 = "../../../assets/stickers/heart rate/7-07.png";
		this.img16 = "../../../assets/stickers/heart rate/7-04.png";
		this.img17 = "../../../assets/stickers/heart rate/plain-04.png"; 
		this.img18 = "../../../assets/stickers/heart rate/7-03.png";
		}

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"heartrate"}])
	}

}
