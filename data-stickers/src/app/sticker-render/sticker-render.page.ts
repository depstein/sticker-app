import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from '../sticker-info-class';


@Component({
  selector: 'app-sticker-render',
  templateUrl: './sticker-render.page.html',
  styleUrls: ['./sticker-render.page.scss'],
})
export class StickerRenderPage implements OnInit {

  constructor(private route: ActivatedRoute, public global: GlobalDataService) {}

  ngOnInit() {
  }

	// Binding to onClick event of sharesheet button 
	shareButton() {}  

  addToRecentUse(){
		this.global.recent_use.push(this.global.stickerInfo.image);
		if(this.global.recent_use.length > 3){
			this.global.recent_use = this.global.recent_use.slice(1,4);
		}
	}

}
