import {ElementRef} from '@angular/core';
import {MusicAnalogy1Config} from './MusicAnalogy1Config';

export class MusicAnalogy3Config extends MusicAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		// this.denominatorValue = 3660000; // (60*60+60)*1000
		this.totalMusic = {"plays":23, "minutes":74, "hours":1.23}; // 74, 
		this.denominatorDescriptor = "the song count as 'Mamma Mia'";
		this.stickerRelevance = "domain-relevant";
	}
}