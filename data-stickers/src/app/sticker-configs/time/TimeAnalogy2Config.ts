import {ElementRef} from '@angular/core';
import {TimeAnalogy1Config} from './TimeAnalogy1Config';

export class TimeAnalogy2Config extends TimeAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 11520000; // (60*60*3+60*12)*1000
		this.denominatorDescriptor = "the flight time from LA to SF";
		this.stickerRelevance = "domain-relevant";
	}
}