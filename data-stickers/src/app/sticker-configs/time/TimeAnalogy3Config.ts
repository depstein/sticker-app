import {ElementRef} from '@angular/core';
import {TimeAnalogy1Config} from './TimeAnalogy1Config';

export class TimeAnalogy3Config extends TimeAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 3660000; // (60*60+60)*1000
		this.denominatorDescriptor = "the length of the 'STAR WARS'";
		this.stickerRelevance = "domain-relevant";
	}
}