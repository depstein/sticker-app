import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from '../generic/GenericAnalogyConfig';

export class CaloriesAnalogy1Config extends GenericAnalogyConfig {
	//If the value is 1, it's probably supposed to be 0, but that doesn't make for a great comparison...
	totalNutrients:{};
    denominatorRoot:string;
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.totalNutrients = {"calories": 540, "g fiber": 1, "g carbs": 40, "g sodium": 790, "g sugar": 1};
		this.denominatorRoot = "a burger";
		this.stickerRelevance = "domain-relevant";
	}

	updateText(el:ElementRef, options:{}=undefined) {
		//TODO: variation by unit also isn't implemented server-side.
		if(this.unit in this.totalNutrients) {
			this.denominatorValue = this.totalNutrients[this.unit];
			this.denominatorDescriptor = ' x ' + this.denominatorRoot;
		} else {
			this.denominatorValue = this.totalNutrients['calories'];
			this.denominatorDescriptor = " " + this.unit + ' per calorie of ' + this.denominatorRoot;
		}
    	var analogy_value = (options['value']/this.denominatorValue).toFixed(1) + " " + options['unit'];
     	//if(options['domain'] == 'time') {
		// 	analogy_value = this.processDefaultTimeText(options['value']/this.denominatorValue);
		// }
    	var sel = el.nativeElement.querySelector('#analogy');
    	sel.textContent = (options['value']/this.denominatorValue).toFixed(1)  + this.denominatorDescriptor;

    	//TODO: this isn't implemented server-side, but isn't that hard to add.
    	var unitSel = el.nativeElement.querySelector('#unit');
    	if(this.unit in this.totalNutrients) {
    		unitSel.textContent = "~" + this.denominatorValue + " " + options['unit'];
    	} else {
    		unitSel.textContent = "~" + this.denominatorValue + " calories";
    	}
  	}
}
