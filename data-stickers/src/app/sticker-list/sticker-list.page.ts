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
	
  constructor(private route: ActivatedRoute, private router: Router,private global: GlobalDataService ) { 
		this.domain = this.router.url;
		this.domain = this.domain.substring(6);
		var arr = []
		var image_list = Object.keys(this.global.image_dict[this.domain])
		
		// Construct a 2d array from the global array of images
		for (let x = 0; x < image_list.length; x++) {
			arr.push(image_list[x])
			if (x % 3 == 2) {
				this.imageArray.push(arr)
				arr = []
			}
		}
		// For now, add additional images to fill the blank space 
		this.imageArray.push(this.imageArray[0], this.imageArray[1], this.imageArray[2])
	}

  ngOnInit() {}
	
	goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain: this.domain}])
	}

}
