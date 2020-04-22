import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalDataService } from "./../global-data.service";
import { Storage } from '@ionic/storage';


@Component({
  selector: "app-create-stickers",
  templateUrl: "./create-stickers.page.html",
  styleUrls: ["./create-stickers.page.scss"],
})
export class CreateStickersPage implements OnInit {
  img_list = [];
  constructor(
    public alertController: AlertController,
    private router: Router,
    public route: ActivatedRoute,
    public global: GlobalDataService,
    private storage: Storage
  ) {
    this.global.stickerInfo.image = this.route.snapshot.paramMap.get("img");
    this.global.stickerInfo.domain = this.route.snapshot.paramMap.get("domain");
    this.global.stickerInfo.value = 0;
    //this.global.stickerInfo.music_value = "The Beatles";
    this.global.stickerInfo.music_value = "";
    this.global.stickerInfo.animation = "none";
    this.global.stickerInfo.hasGoal = false;
    this.global.stickerInfo.unit = Object.keys(
      this.global.domain_info[this.global.stickerInfo.domain].units
    )[0].trim();
    
  }

  ngOnInit() {}

  // Updates animation selection from animation-buttons component
  onAnimationChange(newAnimation: string) {
    this.global.stickerInfo.animation = newAnimation;
  }

  // Binding to onClick event of sharesheet button

  addToRecentUse() {
   // if (!this.global.recent_use.includes(this.global.stickerInfo.image)) {
   //   this.global.recent_use.push(this.global.stickerInfo.image);
   // }
   // if(this.global.recent_use.length > 3){
   //   this.global.recent_use = this.global.recent_use.slice(1,4);
   // }

    if (!this.global.recent_use.includes(this.global.stickerInfo.image)) {
      this.global.recent_use.push(this.global.stickerInfo.image);
    }
    if(this.global.recent_use.length > 3){
      this.global.recent_use = this.global.recent_use.slice(1,4);
    }
    this.img_list = this.global.recent_use;
    this.storage.set("images", this.img_list);
  }

  goToStickerRenderPage() {
	this.addToRecentUse() ;
    this.router.navigate(["sticker-render", {}]);
  }
}
