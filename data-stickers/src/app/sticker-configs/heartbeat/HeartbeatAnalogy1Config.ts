import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from '../generic/GenericAnalogyConfig';

export class HeartbeatAnalogy1Config extends GenericAnalogyConfig {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 105;
		this.denominatorDescriptor = "tempo of 'Rolling in the Deep'";
	}

	updateText(el:ElementRef, options:{}=undefined) {
    	var analogy_value = (options['value']/this.denominatorValue).toFixed(1) + " " + options['unit'];
     	//if(options['domain'] == 'time') {
		// 	analogy_value = this.processDefaultTimeText(options['value']/this.denominatorValue);
		// }
		var denominatorString = " per " + this.denominatorDescriptor;
		if(this.unit == "beats per minute") {
			denominatorString = " x the " + this.denominatorDescriptor;
		}
    	var sel = el.nativeElement.querySelector('#text');
    	sel.textContent = (options['value']/this.denominatorValue).toFixed(1)  + denominatorString;
  	}

  	wrapText(el, options) {
  		//TODO: these ones look incomplete
  		this.updateText(el, options);
      var text = el.nativeElement.querySelector("#text");
      if(text) {
        text.textContent = options['value'] + " " + options['unit'];
      }

      // @ts-ignore
      d3plus
	    .textwrap()
	    // @ts-ignore
	    .container(d3.select("#text"))
	    .resize(false)   
	    .draw();
  	}
}
