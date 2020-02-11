import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  constructor(private navCtrl: NavController,private router: Router) { 

  }

  ngOnInit() {
  }
	
	goToCreateStickerPage(this_img) {
  
    this.router.navigate(['create-sticker', {img: this_img, domain:"heartrate"}]);
	}

}
