import {ElementRef} from '@angular/core';

export abstract class StickerConfig {
	imageURL: string;
	svgURL: string;
	stickerType: string;
	stickerRelevance: string;
  colorMap:{};

	constructor(imageURL, svgURL) {
		this.imageURL = imageURL;
		this.svgURL = svgURL;
		this.stickerType = "";
		this.stickerRelevance = "";
    this.colorMap = undefined;
	}

	color(el:ElementRef, color:string) {
    //By default, coloring does nothing because most stickers are not colorable.
	}

  updateText(el:ElementRef, options:{}=undefined) {
    //By default, there's no text to update. Only analogies need text updating
  }

	animate(el:ElementRef, animation:string, options:{}=undefined) {

		// Getting the svg element from the html page to be animated
		var svg = el.nativeElement.querySelector("svg");

		// Select type of animation based on the value of the "animation" query parameter
		// options = [pulse, shake, count]
		var gsap_animation = this.animation_options(el, svg, animation, options);
    if(gsap_animation) {
      gsap_animation.play();
    }
	}

	animation_options(el, svg, param, options) {
    //var Cont={val:0} , NewVal = options['value'] ;

    switch (param) {
      case "pulse":
      // @ts-ignore
        return TweenMax.fromTo(svg, 0.8, {
          scaleX: 1.05,
          scaleY: 1.15
        },{
          scaleX: 1,
          scaleY: 1,
          // @ts-ignore
          ease: Elastic.easeOut
        });

      case "shake":
      // @ts-ignore
        return TweenLite.fromTo(svg, 1,{ 
            rotation: -10 
          },
          { 
            rotation: 0, 
            // @ts-ignore
            ease: Elastic.easeOut.config(2, 0.2) 
      });

      // case "count":
      //   // @ts-ignore
      //   return TweenLite.to(Cont , 1, {
      //       val: NewVal, 
      //       roundProps: "val", 
      //       onUpdate: ()=>{
      //           el.nativeElement.querySelector("#text").innerHTML= Cont.val;
      //       }
      //   });
    }
    return undefined;
  }
}
