import {ElementRef} from '@angular/core';
import {CaloriesAnalogy1Config} from './CaloriesAnalogy1Config';

export class CaloriesAnalogy3Config extends CaloriesAnalogy1Config {
	//If the value is 1, it's probably supposed to be 0, but that doesn't make for a great comparison...
	totalNutrients:{};
    denominatorRoot:string;
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.totalNutrients = {"calories": 290, "g fiber": 3, "g carbs": 40, "g sodium": 640, "g sugar": 4};
		this.denominatorRoot = "a slice of pizza";
	}
}
