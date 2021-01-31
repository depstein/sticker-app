import {ElementRef} from '@angular/core';
import {GenericPlainConfig} from './GenericPlainConfig';

export class GenericPlain3Config extends GenericPlainConfig {
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
	}

	color(el:ElementRef, color:string) {
		var classMap = {'cls-3':'main', 'cls-8':'shadow', 'cls-6':'highlight'}
		Object.keys(classMap).forEach(cls => {
        var sels = el.nativeElement.querySelectorAll('.' + cls);
        if(sels) {
          	sels.forEach(sel => {
          		sel.setAttribute("style", "fill:" + this.colorMap[color][classMap[cls]]);
        	});
      	}
      });
	}
}
