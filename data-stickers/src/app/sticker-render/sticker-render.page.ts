import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './../global-data.service';
import { StickerInfo } from '../sticker-info-class';


@Component({
  selector: 'app-sticker-render',
  templateUrl: './sticker-render.page.html',
  styleUrls: ['./sticker-render.page.scss'],
})
export class StickerRenderPage implements OnInit {
  imageFromServer: any;
  imageLoaded: boolean;
  url: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, public global: GlobalDataService) {
    this.imageLoaded = false;
    var image_arr = this.global.stickerInfo.image.split('/');
    image_arr = image_arr[image_arr.length-1].split('.');

    this.url = 'https://sheltered-waters-08469.herokuapp.com/' + String(this.global.stickerInfo.domain) + '/?value=' + String(this.global.stickerInfo.value) + '&type=' + String(image_arr[0]) + '&option=' + String(this.global.stickerInfo.animation);
  }

  ngOnInit() {
    this.http.get('https://sheltered-waters-08469.herokuapp.com/heartbeat/?value=100&type=plain-domain-relevant-2&option=shake&goal=0', {responseType: 'blob'})
      .subscribe(data => { 
        this.createImageFromBlob(data);
        this.imageLoaded = true;
      }, error => {
        alert("error");
      });
  }

  createImageFromBlob(image: Blob) {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageFromServer = reader.result;
    }, false)
    if (image) {
      reader.readAsDataURL(image);
    }
  }

	// Binding to onClick event of sharesheet button 


  addToRecentUse(){
		this.global.recent_use.push(this.global.stickerInfo.image);
		if(this.global.recent_use.length > 3){
			this.global.recent_use = this.global.recent_use.slice(1,4);
		}
	}

}
