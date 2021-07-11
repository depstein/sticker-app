import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './../global-data.service';
import { RecentUseService } from './../recent-use.service'
import { Meta } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import { AnalyticsService } from '../analytics.service';

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
  clickedShare: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public global: GlobalDataService, private recentUse:RecentUseService, public meta: Meta, private analyticsService: AnalyticsService) {
    this.imageLoading = true;
    this.imageLoadedSuccess = false;
    this.imageLoadedError = false;
    // this.meta.updateTag({ content: "https://denniswang.info/assets/images/test-sticker.png", property: "snapchat:sticker" });

    this.constructUrl();

  }

  ngOnInit() {
    console.log(this.url);
    this.analyticsService.renderStickerEvent(this.url);
    this.clickedShare = false;
    this.http.get(this.url, {responseType: 'blob'})
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
      //TODO: fix this
    //this.recentUse.addToRecentUse(this.global.stickerInfo.image);
  }

  //TODO: fix this
  constructUrl() {
    //var image_arr = this.global.stickerInfo.image.split('/');
    //image_arr = image_arr[image_arr.length-1].split('.');

    // this.url = 'http://localhost:5000/';                                  // base url
    this.url = `${environment.serverURL}/`;               // base url
    // this.url = 'http://192.168.86.24:5000/';           // base url
    if(this.global.stickerInfo.stickerRelevance == "domain-agnostic") {
      this.url += 'generic';
    }
    else if (String(this.global.stickerInfo.domain) == "calories") {
      this.url += "food";
    } else {
      this.url += String(this.global.stickerInfo.domain);                   // domain (ex. steps)
    }
    //// working parameters
    this.url += '/?value=' + String(this.global.stickerInfo.value);             // value (ex. 1000)
    this.url += '&variation=' + String(this.global.stickerInfo.variation);      // variation (ex. 1, 2, 3)
    this.url += '&unit=' + String(this.global.stickerInfo.unit);                // unit (ex. banana, beats per minute)
    this.url += '&type=' + String(this.global.stickerInfo.stickerType);         // image type (ex. plain, chartjunk, analogy)
    this.url += '&option=' + String(this.global.stickerInfo.animation);         // animation (ex. shake)
    if (this.global.stickerInfo.hasGoal) {
      this.url += '&goal=' + (this.global.stickerInfo.hasGoal ? String(this.global.stickerInfo.goal) : '0');  // goal (ex. 1000)
    }
    if(this.global.stickerInfo.color) {
      this.url += '&color=' + this.global.stickerInfo.color;
    }
    if(String(this.global.stickerInfo.domain) == "time") {
      this.url += '&time=' + 'true';
    } else {
      this.url += '&time=' + 'false';
    }
    // TODO: color? change type.

    //// testing parameters
    // this.url += '/?value=' + String(this.global.stickerInfo.value);         // value (ex. 1000)
    // this.url += '&variation=' + String(1);                                  // variation (ex. 1, 2, 3)
    // this.url += '&unit=' + String("unit");                                  // unit (ex. banana, beats per minute)
    // // this.url += '&type=' + String(image_arr[0]);                         // image type (ex. plain-domain-relevant-1)
    // this.url += '&type=' + String("plain");                                 // image type (ex. plain-domain-relevant-1)
    // // this.url += '&option=' + String(this.global.stickerInfo.animation);  // animation (ex. shake)
    // this.url += '&option=' + String("pulse");                               // animation (ex. shake)
    // this.url += '&goal=' + (this.global.stickerInfo.hasGoal ? String(this.global.stickerInfo.goal) : '0');  // goal (ex. 1000)
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
  refreshPage(){
    this.imageLoading = true;
    this.imageLoadedError = false;
    this.http.get(this.url, {responseType: 'blob'})
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
  }

  backToMenu(){
    this.router.navigate(['home/'+this.global.stickerInfo.domain]);
  }

  finishSharing(){
    this.clickedShare = true;
  }

  shareToSocialMedia() {
    console.log("Share!");
    //Does nothing right now; is there something which needs to be merged in?
  }

}
