import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerCallService {
  url: string; 
  constructor(public global: GlobalDataService, private http: HttpClient) { }

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

  requestSticker() {
    this.constructUrl()
    let that = this; 
    return new Promise(function(resolve, reject) {
      that.http.get(that.url, {responseType: 'blob'})
      .subscribe(data => { 
        console.log("got data from server, creating image from blob");
        let objUrl = URL.createObjectURL(data);
        console.log(objUrl);
        resolve(objUrl);
      })
    })
  }

}
