import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from '../sticker-info-class';
import { Storage } from '@ionic/storage';
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

  constructor(private route: ActivatedRoute, private http: HttpClient, public global: GlobalDataService, private serverCall: ServerCallService,private storage:Storage) {}

  ngOnInit() {
    this.addToRecentUse();
    this.imageLoading = true;
    this.imageLoadedSuccess = false;
    this.imageLoadedError = false;
    this.imageFromServer = undefined; 
    
    this.serverCall.requestSticker().then(
      result => {
        this.imageFromServer = result;
        this.imageLoading = false;
        this.imageLoadedSuccess = true; 
      }, error => {
        this.errorStatus = "Status: " + String(error.status) + ", " + error.statusText; 
        this.imageLoading = false;
        this.imageLoadedError = true;
      });
    
  }

  constructUrl() {
    var image_arr = this.global.stickerInfo.image.split('/');
    image_arr = image_arr[image_arr.length-1].split('.');
    
    this.url = 'https://sheltered-waters-08469.herokuapp.com/';           // base url
    this.url += String(this.global.stickerInfo.domain);                   // domain (ex. steps)
    this.url += '/?value=' + String(this.global.stickerInfo.value);       // value (ex. 1000)
    this.url += '&type=' + String(image_arr[0]);                          // image type (ex. plain-domain-relevant-1)
    this.url += '&option=' + String(this.global.stickerInfo.animation);   // animation (ex. shake) 
    this.url += '&goal=' + (this.global.stickerInfo.hasGoal ? String(this.global.stickerInfo.goal) : '0');  // goal (ex. 1000)
  }

  createImageFromBlob(image: Blob) {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageFromServer = reader.result;
    }, false)
    if (image) {
      reader.readAsDataURL(image);
    }
      //this.imageLoadedError = true; 
      
  
  }

    /*
    this.global.recent_use.push(this.global.stickerInfo.image);
    console.log("added");
		if(this.global.recent_use.length > 3){
      this.global.recent_use = this.global.recent_use.slice(1,4);
      console.log("out of 3");
    }
    */
   addToRecentUse() {
    console.log(1);
    // Get the array from local storage
    let stickerArray = [];
    this.storage.get('recentUse').then((value) => {
      stickerArray = JSON.parse(value);
      // Check to see the sticker is in the array
      if (!stickerArray.includes(this.global.stickerInfo.image)) {
        stickerArray.push(this.global.stickerInfo.image);
        }
      console.log(stickerArray.length);
      if (stickerArray.length > 3) {
        stickerArray = stickerArray.slice(1, 4);
      }
      console.log("sticker array (after push)", stickerArray);
      this.storage.set('recentUse', JSON.stringify(stickerArray)).then(() => {
        this.storage.get('recentUse').then((value) => {
            console.log(JSON.parse(value));
        });
      });
    });
  }

  refreshPage() {
    this.ngOnInit();
  }
  
}