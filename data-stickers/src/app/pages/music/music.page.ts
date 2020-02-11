import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
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

  constructor(private navCtrl: NavController,private router: Router) {
    this.img1 = "../../../assets/stickers/music/6-09.png" ;
    this.img2 = "../../../assets/stickers/music/plain-06.png";
		this.img3 = "../../../assets/stickers/music/6-12.png" ;
		this.img4 = "../../../assets/stickers/music/6-02.png";
		this.img5 = "../../../assets/stickers/music/embellished-12.png";
		this.img6 = "../../../assets/stickers/music/embellished-07.png" ;
		this.img7 = "../../../assets/stickers/music/plain-13.png" ;
		this.img8 = "../../../assets/stickers/music/6-10.png";
		this.img9 = "../../../assets/stickers/music/plain-05.png";
		this.img10 = "../../../assets/stickers/music/6-01.png" ;
		this.img11 = "../../../assets/stickers/music/6-08.png";
    this.img12 = "../../../assets/stickers/music/embellished-04.png" ;
    this.img13 = "../../../assets/stickers/music/6-01.png";
	  this.img14 = "../../../assets/stickers/music/6-08.png" ;
	  this.img15 = "../../../assets/stickers/music/embellished-04.png";
	  this.img16 = "../../../assets/stickers/music/6-06.png";
	  this.img17 = "../../../assets/stickers/music/6-03.png";
	  this.img18 ="../../../assets/stickers/music/plain-05.png"
    
   }
  

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain:"music"}])
	}

}
