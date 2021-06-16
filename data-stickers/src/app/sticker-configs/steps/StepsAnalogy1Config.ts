import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from '../generic/GenericAnalogyConfig';

export class StepsAnalogy1Config extends GenericAnalogyConfig {
	totalDistance:{};
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.totalDistance = {steps:3592, km:2.7, miles:1.7};
		this.denominatorDescriptor = "the Golden Gate Bridge";
		this.stickerRelevance = "domain-relevant";
	}

	updateText(el:ElementRef, options:{}=undefined) {
		var denominatorString = " per step of " + this.denominatorDescriptor;
		this.denominatorValue = this.totalDistance['steps'];
		if(this.unit in this.totalDistance) {
			denominatorString = " x " + this.denominatorDescriptor;
			this.denominatorValue = this.totalDistance[this.unit];
		}

    	var analogy_value = (options['value']/this.denominatorValue).toFixed(1) + " " + options['unit'];
     	//if(options['domain'] == 'time') {
		// 	analogy_value = this.processDefaultTimeText(options['value']/this.denominatorValue);
		// }
    	var sel = el.nativeElement.querySelector('#analogy');
    	sel.textContent = (options['value']/this.denominatorValue).toFixed(1)  + denominatorString;
  	}
	
	// TODO: Animation Here?

  	// wrapText(el, options) {
  	// 	//TODO: these ones look incomplete
  	// 	//I think the text is shapes rather an an image, which will require some fixing.
  	// 	this.updateText(el, options);
    //   var text = el.nativeElement.querySelector("#text");
    //   if(text) {
    //     text.textContent = options['value'] + " " + options['unit'];
    //   }

    //   // @ts-ignore
    //   d3plus
	//     .textwrap()
	//     // @ts-ignore
	//     .container(d3.select("#text"))
	//     .resize(false)   
	//     .draw();
  	// }
}
