import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from './GenericAnalogyConfig';

export class GenericAnalogy3Config extends GenericAnalogyConfig {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 550;
		this.denominatorDescriptor = 'pound of a pig';
	}
}
