import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RecentUseService {
	public stickerArray:string[] = null;

  constructor(private storage: Storage) {
  	this.loadStickers();
  }

  loadStickers() {
  	this.storage.get('recentUse').then((value) => {
      this.stickerArray = JSON.parse(value);
    });
  }

  addToRecentUse(sticker:string) {
    // Get the array from local storage
    console.log("sticker", sticker);
    this.storage.get('recentUse').then((value) => {
      if(value != null) {
        this.stickerArray = JSON.parse(value);
      }
      // Check to see the sticker is in the array
      if(this.stickerArray != null){
        if (!this.stickerArray.includes(sticker)) {
          //Push it to the FRONT of the array
          this.stickerArray.unshift(sticker);
          }
        if (this.stickerArray.length > 3) {
          this.stickerArray = this.stickerArray.slice(0, 3);
        }
        this.storage.set('recentUse', JSON.stringify(this.stickerArray)).then(() => {
        });
      }
      
      
    });
  }
}