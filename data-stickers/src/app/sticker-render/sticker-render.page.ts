import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from '../sticker-info-class';
import { RecentUseService } from './../recent-use.service'
import { Meta } from '@angular/platform-browser';

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
  
  constructor(private route: ActivatedRoute, private http: HttpClient, public global: GlobalDataService, private recentUse:RecentUseService, public meta: Meta) {
    this.imageLoading = true;
    this.imageLoadedSuccess = false;
    this.imageLoadedError = false;
    // this.meta.updateTag({ content: "https://denniswang.info/assets/images/test-sticker.png", property: "snapchat:sticker" });

    this.constructUrl();

  }

  ngOnInit() {
    var url = this.url;
    this.http.get(url, {responseType: 'blob'})
      .subscribe(data => { 
        this.createImageFromBlob(data);
        this.imageLoading = false;
        this.imageLoadedSuccess = true;
      }, error => {
        console.log(error);
        this.errorStatus = "Status: " + String(error.status) + ", " + error.statusText;
        this.imageLoading = false;
        this.imageLoadedError = true;
      });
    this.recentUse.addToRecentUse(this.global.stickerInfo.image);
  }

  constructUrl() {
    var image_arr = this.global.stickerInfo.image.split('/');
    image_arr = image_arr[image_arr.length-1].split('.');
    
    this.url = 'https://sheltered-waters-08469.herokuapp.com/';           // base url
    // this.url = 'http://192.168.86.24:5000/';           // base url
    if (String(this.global.stickerInfo.domain) == "calories") {
      this.url += "food";
    } else {
      this.url += String(this.global.stickerInfo.domain);                   // domain (ex. steps)
    }
    this.url += '/?value=' + String(this.global.stickerInfo.value);       // value (ex. 1000)
    this.url += '&variation=' + String(1);                                // variation (ex. 1, 2, 3)
    this.url += '&unit=' + String("unit");                                // unit (ex. banana, beats per minute)
    // this.url += '&type=' + String(image_arr[0]);                          // image type (ex. plain-domain-relevant-1)
    this.url += '&type=' + String("plain");                          // image type (ex. plain-domain-relevant-1)
    // this.url += '&option=' + String(this.global.stickerInfo.animation);   // animation (ex. shake) 
    this.url += '&option=' + String("pulse");   // animation (ex. shake) 
    this.url += '&goal=' + (this.global.stickerInfo.hasGoal ? String(this.global.stickerInfo.goal) : '0');  // goal (ex. 1000)
  }

  createImageFromBlob(image: Blob) {
    var reader = new FileReader();
    this.imageFromServer = this.url; // only getting url
    // reader.addEventListener("load", () => {
    //   this.imageFromServer = reader.result;
    // }, false)
    // reader.onload = () => {
    //   this.imageFromServer = reader.result;
    // };

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  refreshPage(){}

  shareToSocialMedia() {
    console.log("Share!");
    //Does nothing right now; is there something which needs to be merged in?
  }
  
}