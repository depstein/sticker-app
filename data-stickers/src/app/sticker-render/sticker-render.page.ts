import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from '../sticker-info-class';
import { ServerCallService } from './../server-call.service';

@Component({
  selector: 'app-sticker-render',
  templateUrl: './sticker-render.page.html',
  styleUrls: ['./sticker-render.page.scss'],
})
export class StickerRenderPage implements OnInit {
  imageFromServer: any;
  imageLoading: boolean;
  imageLoadedSuccess: boolean;
  imageLoadedError: boolean;
  errorStatus: string;
  url: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, public global: GlobalDataService, private serverCall: ServerCallService) {
    this.imageLoading = true;
    this.imageLoadedSuccess = false;
    this.imageLoadedError = false;
    this.imageFromServer = undefined; 
  }

  ngOnInit() {
    this.serverCall.requestSticker().then(
      result => {
        this.imageFromServer = result;
        this.imageLoading = false;
        this.imageLoadedSuccess = true; 
      }, error => {
        this.errorStatus = "Status: " + String(error.status) + ", " + error.statusText; 
        this.imageLoading = false;
        this.imageLoadedError = true; 
      }
    )
  }

  addToRecentUse(){
    this.global.recent_use.push(this.global.stickerInfo.image);
    console.log("added");
		if(this.global.recent_use.length > 3){
      this.global.recent_use = this.global.recent_use.slice(1,4);
      console.log("out of 3");
    }
  }
  
}
