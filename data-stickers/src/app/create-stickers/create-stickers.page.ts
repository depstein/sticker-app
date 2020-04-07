import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataService } from './../global-data.service';


@Component({
  selector: 'app-create-stickers',
  templateUrl: './create-stickers.page.html',
  styleUrls: ['./create-stickers.page.scss'],
})
export class CreateStickersPage implements OnInit {

	constructor(public alertController: AlertController, private router: Router, public route: ActivatedRoute, public global: GlobalDataService ) {
		this.global.stickerInfo.image = this.route.snapshot.paramMap.get("img");
		this.global.stickerInfo.domain = this.route.snapshot.paramMap.get("domain");
		this.global.stickerInfo.value = 0;
		//this.global.stickerInfo.music_value = "The Beatles";
		this.global.stickerInfo.music_value = '';
		this.global.stickerInfo.animation = "none";
		this.global.stickerInfo.hasGoal = false;
		this.global.stickerInfo.unit = Object.keys(this.global.domain_info[this.global.stickerInfo.domain].units)[0].trim();
	}
	
  	ngOnInit() {}

	goToStickerRenderPage() {
		this.router.navigate(['sticker-render', {}])
	}
}