import {ElementRef} from '@angular/core';
import {StickerConfig} from '../sticker-config'

export class SpecificHybrid2Config extends StickerConfig {
	plainSvgURL:string;
	chartjunkSvgURL:string;

	constructor(imageURL:string, svgURL:string, chartjunkSvgURL:string) {
		super(imageURL, svgURL);
		this.stickerType = "plain";//Default to plain, but can swap to chartjunk
		this.stickerRelevance = "domain-relevant";
		this.canAddGoal = true;
		this.plainSvgURL = svgURL;
		this.chartjunkSvgURL = chartjunkSvgURL;
	}

	toggleGoal() {
		if(this.stickerType == "plain") {
			//Toggle to chartjunk
			this.stickerType = "chartjunk";
			this.svgURL = this.chartjunkSvgURL;
		}
		else {
			//Toggle to plain
			this.stickerType = "plain";
			this.svgURL = this.plainSvgURL;
		}
	}

	//Compared to SpecificHybridConfig, this one uses -yPercent versus +xPercent
	animation_options(el, svg, param, options) {
		if(this.stickerType == "chartjunk") {
			// @ts-ignore
			var tl = gsap.timeline({ paused: true });
			//Maxing this out at 100 so the bar fills up, but this might not be what we want to happen.
			var percent = Math.min(100, Math.floor(options['value']/options['goal']*100));
			if(param == 'fill') {
				var gsap_animation = tl.to("#fill-mask", {duration:0, yPercent:0})
				.to("#fill-mask", {duration:1, yPercent:-percent, stagger:0.4})
					.to(svg, 0.8, {
					scaleX: 1.05,
					scaleY: 1.05,
					// @ts-ignore
					ease: Elastic.easeOut
				}).to(svg, 0,{
		          scaleX: 1,
		          scaleY: 1,
		          // @ts-ignore
		          ease: Elastic.easeOut
		        });
				return gsap_animation;
			}

			//Fill up the bar before running the next animation
			tl.to("#fill-mask", {duration:0, yPercent:-percent}).play();
		}
		return super.animation_options(el, svg, param, options);
	}
}
