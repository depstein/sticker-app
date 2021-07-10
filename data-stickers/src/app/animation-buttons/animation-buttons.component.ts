import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';
import { AnalyticsService } from '../analytics.service';


@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {
	@Output() changeAnimation:EventEmitter<any> = new EventEmitter();

  	constructor(public global: GlobalDataService, private analyticsService: AnalyticsService) {}

  	ngOnInit() {}

	noAnimation() {
		this.global.stickerInfo.animation = "none";
		this.analyticsService.animationButtonEvent("none");
		this.changeAnimation.emit();
	}

	pulseAnimation() {
		this.global.stickerInfo.animation = "pulse";
		this.analyticsService.animationButtonEvent("pulse");
		this.changeAnimation.emit();
	}

	shakeAnimation() {
		this.global.stickerInfo.animation = "shake";
		this.analyticsService.animationButtonEvent("shake");
		this.changeAnimation.emit();
	}

	fillAnimation() {
		this.global.stickerInfo.animation = "fill";
		this.analyticsService.animationButtonEvent("fill");
		this.changeAnimation.emit();
	}

	countAnimation() {
		this.global.stickerInfo.animation = "count";
		this.analyticsService.animationButtonEvent("count");
		this.changeAnimation.emit();
	}	
}