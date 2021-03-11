import {ElementRef} from '@angular/core';
import {CaloriesAnalogy1Config} from './CaloriesAnalogy1Config';

export class CaloriesAnalogy2Config extends CaloriesAnalogy1Config {
	//If the value is 1, it's probably supposed to be 0, but that doesn't make for a great comparison...
	totalNutrients:{};
    denominatorRoot:string;
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.totalNutrients = {"calories": 150, "g fiber": 1, "g carbs": 20, "g sodium": 90, "g sugar": 10};
		this.denominatorRoot = "a chocolate chip cookie";
	}
}
