import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from '../generic/GenericAnalogyConfig';

export class TimeAnalogy1Config extends GenericAnalogyConfig {
	totalTime:{};
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
        this.totalTime = {seconds:11520000}; // (60*60*3+60*12)*1000
		this.denominatorDescriptor = "a normal NFL game";
		this.stickerRelevance = "domain-relevant";
	}

	updateText(el:ElementRef, options:{}=undefined) {
		var denominatorString = " x " + this.denominatorDescriptor;
		this.denominatorValue = this.totalTime['seconds'];
		if(this.unit in this.totalTime) {
			denominatorString = " x " + this.denominatorDescriptor;
			this.denominatorValue = this.totalTime[this.unit];
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
