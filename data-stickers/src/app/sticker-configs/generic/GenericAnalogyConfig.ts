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
			analogy_value = this.getBestTimeText(options['value']);
		}
    	var sel = el.nativeElement.querySelector('#analogy');
    	sel.textContent = analogy_value  + " per " + this.denominatorDescriptor;
  	}

  	getBestTimeText(value):string {
  		var parseDuration = moment.duration(value/this.denominatorValue);
	    var orderOfDuration = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
	    var durationAbbr = {
	      "years": "year", 
	      "months": "month",
	      "days": "day", 
	      "hours": "hour", 
	      "minutes": "min", 
	      "seconds": "sec", 
	      "milliseconds": "ms"
	    }
	    var topTwoUnits = [];
	    var finalValue = "";

	    for (var i = 0; i < orderOfDuration.length; i++) {
	    if (parseDuration["_data"][orderOfDuration[i]] !== 0){
	        var unit = ((parseDuration["_data"][orderOfDuration[i]] > 1) ? durationAbbr[orderOfDuration[i]] + "s" : durationAbbr[orderOfDuration[i]]);
	        topTwoUnits.push([unit, parseDuration["_data"][orderOfDuration[i]]])
	        if(topTwoUnits.length === 2) {
	        break;
	        }
	    }
	    } 
	    if (topTwoUnits.length > 1) {
	      finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0] + ", " + Math.floor(topTwoUnits[1][1]) + " " + topTwoUnits[1][0];
	    }
	    else if(topTwoUnits.length > 0) {
	      finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0];
	    } else {
	      finalValue = "0 sec";
	    }
	    return finalValue;
  	}
}
