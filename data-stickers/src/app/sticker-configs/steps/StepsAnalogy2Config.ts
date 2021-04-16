import {ElementRef} from '@angular/core';
import {StepsAnalogy1Config} from './StepsAnalogy1Config';

export class StepsAnalogy2Config extends StepsAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 525;
		this.denominatorDescriptor = "a track";
		this.stickerRelevance = "domain-relevant";
	}
}
