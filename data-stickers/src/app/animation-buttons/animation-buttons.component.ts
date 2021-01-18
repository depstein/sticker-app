import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {

	enabled = this.analyticsService.analyticsEnabled;
  	constructor(public global: GlobalDataService, private analyticsService: AnalyticsService) {}

  	ngOnInit() {}

	noAnimation() {
		if (this.global.stickerInfo.animation != "none") {
			this.global.stickerInfo.animation = "none";
		}
		this.logAnimationEvent("none");
	}

	pulseAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "pulse" ? "none" : "pulse");
		this.logAnimationEvent("pulse");
	}

	shakeAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "shake" ? "none" : "shake");
		this.logAnimationEvent("shake");
	}

	fillAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "fill" ? "none" : "fill");
		this.logAnimationEvent("fill");
	}

	countAnimation() {
		this.global.stickerInfo.animation = (this.global.stickerInfo.animation == "count" ? "none" : "count");
		this.logAnimationEvent("count");
	}	

	logAnimationEvent(animationName) {
		this.analyticsService.setUser();
    	this.analyticsService.animationButtonEvent(animationName);
	}
}