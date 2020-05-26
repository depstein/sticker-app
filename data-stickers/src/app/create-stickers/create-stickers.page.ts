import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalDataService } from "./../global-data.service";
import { Storage } from "@ionic/storage";

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
    if(this.global.stickerInfo.domain == "music"){
      this.presentAlertMultipleButtons();
    }
    
  }

  ngOnInit() {}

  // Updates animation selection from animation-buttons component
  onAnimationChange(newAnimation: string) {
    this.global.stickerInfo.animation = newAnimation;
  }

  goToStickerRenderPage() {
    this.router.navigate(["sticker-render", {}]);
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      message: 'Do you want to get your playlist from spolify?',
      buttons: ['NO', 'YES', ]
    });

    await alert.present();
  }
}
