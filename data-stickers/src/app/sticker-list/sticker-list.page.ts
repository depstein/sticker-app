import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataService } from './../global-data.service';

@Component({
  selector: 'app-sticker-list',
  templateUrl: './sticker-list.page.html',
  styleUrls: ['./sticker-list.page.scss'],
})
export class StickerListPage implements OnInit {
	domain: string;
	imageDict = {}
	imageArray = [];
	
<<<<<<< HEAD
  constructor(private route: ActivatedRoute, private router: Router,public global: GlobalDataService ) { 
=======
	constructor(private route: ActivatedRoute, private router: Router, private global: GlobalDataService) {
>>>>>>> d487e44ea5ffe6ab50f830272179667e69100de2
		this.domain = this.router.url;
		this.domain = this.domain.substring(6);
		this.imageArray = this.global.image_dict[this.domain];
	}

  ngOnInit() {}
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain: this.domain}])
	}

}
