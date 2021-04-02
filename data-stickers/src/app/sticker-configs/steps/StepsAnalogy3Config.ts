import {ElementRef} from '@angular/core';
import {StepsAnalogy1Config} from './StepsAnalogy1Config';

export class StepsAnalogy3Config extends StepsAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 3592;
		this.denominatorDescriptor = "the Empire State Building";
	}
}
