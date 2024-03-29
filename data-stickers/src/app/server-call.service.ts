import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerCallService {
  url: string;
  constructor(public global: GlobalDataService, private http: HttpClient) { }

  constructUrl() {
    var image_arr = this.global.stickerInfo.imageURL.split('/');
    image_arr = image_arr[image_arr.length-1].split('.');
    this.url = `${environment.serverURL}/`;               // base url
    // this.url = 'http://192.168.86.24:5000/';           // base url
    //this.url += (this.global.stickerInfo.domain === 'calories' ? 'food' : this.global.stickerInfo.domain);  // domain (ex. steps)
    this.url += this.global.stickerInfo.domain;
    this.url += '/?value=' + String(this.global.stickerInfo.value);       // value (ex. 1000)
    this.url += '&variation=' + String(1);                                // variation (ex. 1, 2, 3)
    this.url += '&unit=' + String("unit");                                // unit (ex. banana, beats per minute)
    // this.url += '&type=' + String(image_arr[0]);                          // image type (ex. plain-domain-relevant-1)
    this.url += '&type=' + String("plain");                          // image type (ex. plain-domain-relevant-1)
    // this.url += '&option=' + String(this.global.stickerInfo.animation);   // animation (ex. shake)
    this.url += '&option=' + String("pulse");   // animation (ex. shake)
    this.url += '&goal=' + (this.global.stickerInfo.hasGoal ? String(this.global.stickerInfo.goal) : '0');  // goal (ex. 1000)
    console.log(this.url)
  }

  requestSticker() {
    this.constructUrl()
    let that = this;
    return new Promise(function(resolve, reject) {
      that.http.get(that.url, {responseType: 'blob'})
      .subscribe(
        data => {
          let objUrl = URL.createObjectURL(data);
          resolve(objUrl);
        },
        error => {
          reject(error)
        }
      )
    })
  }

}
