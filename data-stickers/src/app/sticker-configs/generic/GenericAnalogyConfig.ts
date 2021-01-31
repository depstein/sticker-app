import {ElementRef} from '@angular/core';
import {StickerConfig} from '../sticker-config';
import * as moment from 'moment';

export class GenericAnalogyConfig extends StickerConfig {
	denominatorValue:number;
	denominatorDescriptor:string;
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.stickerType = "analogy";
		this.stickerRelevance = "domain-agnostic";
		this.denominatorValue = 930;
		this.denominatorDescriptor = 'pound of a horse';
	}



	updateText(el:ElementRef, options:{}=undefined) {
    	var analogy_value = (options['value']/this.denominatorValue).toFixed(1) + " " + options['unit'];
    	if(options['domain'] == 'time') {
			analogy_value = this.processDefaultTimeText(options['value']/this.denominatorValue);
		}
    	var sel = el.nativeElement.querySelector('#analogy');
    	sel.textContent = analogy_value  + " per " + this.denominatorDescriptor;
  	}

  	animation_options(el, svg, param, options) {
  		if(param == 'count') {
  			var Cont={val:0} , NewVal = options['value'];
  			// @ts-ignore
	        return TweenLite.to(Cont , 1, {
	            val: NewVal, 
	            roundProps: "val", 
	            onUpdate: ()=>{
	            	options['value'] = Cont.val;
	                this.wrapText(el, options);
	            }
	        });
  		}

  		return super.animation_options(el, svg, param, options);
  	}
}
