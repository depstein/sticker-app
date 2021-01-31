import {ElementRef} from '@angular/core';
import {StickerConfig} from '../sticker-config';

export class GenericChartjunk3Config extends StickerConfig {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.stickerType = "chartjunk";
		this.stickerRelevance = "domain-agnostic";
		this.colorMap = {
			purple: { main: "#b760c2", text: "#ff6363" },
			gold: { main: "#fcc335", text: "#ef1796" },
			red: { main: "#ff6363", text: "#81bf40" },
			green: { main: "#7dde18", text: "#fcc335" },
			pink: { main: "#f28cc9", text: "#964f9f" }
		};
	}

	color(el:ElementRef, color:string) {
		['main', 'text'].forEach(selector => {
        var sel = el.nativeElement.querySelector('#' + selector);
        if(sel) {
          sel.setAttribute("style", "fill:" + this.colorMap[color][selector]);
        }
      });
	}

	animation_options(el, svg, param, options) {
		// @ts-ignore
		var tl = gsap.timeline({ paused: true });
		//Slightly different pixel counts
		var percent = 18+1.62*options['percent'];
		if(param == 'fill') {
			var gsap_animation = 
			tl.to("#fill-mask", {duration:0, rotation:0, transformOrigin: "top center"})
			.to("#meter", {duration:0, rotation:0, transformOrigin: "right center"})
			.to("#fill-mask", {duration:1.5, rotation:percent, transformOrigin: "top center", stagger:0.4})
			.to("#meter", {duration:1.5, rotation:percent, transformOrigin: "right center", stagger:0.4}, 0)
                .to(svg, 0.8, {
                scaleX: 1.05,
                scaleY: 1.05,
                // @ts-ignore
                ease: Elastic.easeOut,
                repeatDelay: 0.5,
                repeat: 0
                }).to(svg, 0,{
	          scaleX: 1,
	          scaleY: 1,
	          // @ts-ignore
	          ease: Elastic.easeOut
	        });
			return gsap_animation;
		}

		tl.to("#fill-mask", {duration:0, rotation:percent, transformOrigin: "top center"})
		.to("#meter", {duration:0, rotation:percent, transformOrigin: "right center"}, 0).play();
		return super.animation_options(el, svg, param, options);
	}
}
