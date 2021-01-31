import {ElementRef} from '@angular/core';
import {GenericAnalogyConfig} from './GenericAnalogyConfig';

export class GenericAnalogy2Config extends GenericAnalogyConfig {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.denominatorValue = 330;
		this.denominatorDescriptor = 'pound of a panda bear';
	}
}
