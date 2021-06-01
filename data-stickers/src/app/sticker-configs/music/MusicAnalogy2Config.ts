import {ElementRef} from '@angular/core';
import {MusicAnalogy1Config} from './MusicAnalogy1Config';

export class MusicAnalogy2Config extends MusicAnalogy1Config {
	
	constructor(imageURL:string, svgURL:string) {
		super(imageURL, svgURL);
		// this.denominatorValue = 11520000; // (60*60*3+60*12)*1000
		this.totalMusic = {"plays":9, "minutes":42.27, "hours":0.702}; 
		this.denominatorDescriptor = "the song count as 'Thriller'";
		this.stickerRelevance = "domain-relevant";
	}
}