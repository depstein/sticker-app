import {ElementRef} from '@angular/core';
import {HeartbeatAnalogy1Config} from './HeartbeatAnalogy1Config';

export class HeartbeatAnalogy2Config extends HeartbeatAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 80;
		this.denominatorDescriptor = "resting heart rate";
	}
}
