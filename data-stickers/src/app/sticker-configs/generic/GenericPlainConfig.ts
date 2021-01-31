import {ElementRef} from '@angular/core';
import {StickerConfig} from '../sticker-config'

export class GenericPlainConfig extends StickerConfig {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		this.stickerType = "plain";
		this.stickerRelevance = "domain-agnostic";
		this.colorMap = {
			"purple": {"highlight": "#df76ed", "main": "#df76ed", "shadow": "#cf6ddb"},
			"gold": {"highlight": "#ffd369", "main": "#fcc335", "shadow": "#edb733"},
			"red": {"highlight": "#ff8080", "main": "#ff6363", "shadow": "#ed5c5c"},
			"green": {"highlight": "#82ff00", "main": "#7dde18", "shadow": "#73cc16"},
			"blue": {"highlight": "#73e9ff", "main": "#35defc", "shadow": "#31cfeb"}
		};
	}

	color(el:ElementRef, color:string) {
		['highlight', 'main', 'shadow'].forEach(selector => {
        var sel = el.nativeElement.querySelector('#' + selector);
        if(sel) {
          sel.setAttribute("style", "fill:" + this.colorMap[color][selector]);
        }
      });
	}
}
