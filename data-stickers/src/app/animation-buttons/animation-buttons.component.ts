import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';


@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {

  	constructor(public global: GlobalDataService) {}

  	ngOnInit() {}

	noAnimation() {
		if (this.global.stickerInfo.animation != "none") {
			this.global.stickerInfo.animation = "none";
		}
	}

	pulseAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "pulse" ? "none" : "pulse");
	}

	shakeAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "shake" ? "none" : "shake");
	}

	fillAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "fill" ? "none" : "fill");
	}

	countAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "count" ? "none" : "count");
	}	
}