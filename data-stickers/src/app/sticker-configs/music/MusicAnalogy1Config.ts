import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from '../generic/GenericAnalogyConfig';

export class MusicAnalogy1Config extends GenericAnalogyConfig {
	totalMusic:{};
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
        this.totalMusic = {"plays":11, "minutes":48.02, "hours":0.8}; // (60*60*3+60*12)*1000
		this.denominatorDescriptor = "the song count as '21'";
		this.stickerRelevance = "domain-relevant";
	}

	updateText(el:ElementRef, options:{}=undefined) {
		var denominatorString = " x " + this.denominatorDescriptor;
		this.denominatorValue = this.totalMusic[this.unit];
		if (this.unit === "plays") {
			denominatorString = " x " + this.denominatorDescriptor;
			this.denominatorValue = this.totalMusic["plays"];
		} else {
			// TODO: fix denominatorString to reflect different unit of music
			denominatorString = " x " + this.denominatorDescriptor;
			this.denominatorValue = this.totalMusic["plays"];
		}
		console.log(this.denominatorValue);
		console.log(this.unit);
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
