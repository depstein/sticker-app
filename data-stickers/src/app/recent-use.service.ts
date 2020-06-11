import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RecentUseService {
	public stickerArray:string[] = [];

  constructor(private storage: Storage) {
  	this.loadStickers();
  }

  loadStickers() {
  	this.storage.get('recentUse').then((value) => {
      this.stickerArray = JSON.parse(value);
    });
    console.log("loadStickers() executed: "+this.stickerArray)
  }

  addToRecentUse(sticker:string) {
    if(this.stickerArray != null){
      if (!this.stickerArray.includes(sticker)) {
        // Push it to the FRONT of the array
        this.stickerArray.unshift(sticker);
        }
      if (this.stickerArray.length > 3) {
        this.stickerArray = this.stickerArray.slice(0, 3);
      }
    } else {
      this.stickerArray = [sticker]
    } 
      this.storage.set('recentUse', JSON.stringify(this.stickerArray))
  }
}