import {ElementRef} from '@angular/core';
import {HeartbeatAnalogy1Config} from './HeartbeatAnalogy1Config';

export class HeartbeatAnalogy3Config extends HeartbeatAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 75;
		this.denominatorDescriptor = "walking pace";
		this.stickerRelevance = "domain-relevant";
	}
}
