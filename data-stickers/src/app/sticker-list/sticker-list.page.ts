import { Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../modals/settings/settings.page'
import { Storage } from '@ionic/storage';
import { GlobalDataService } from "./../global-data.service";
import { RecentUseService } from "./../recent-use.service";
import { StickerConfig } from '../sticker-configs/sticker-config';

@Component({
  selector: "app-sticker-list",
  templateUrl: "./sticker-list.page.html",
  styleUrls: ["./sticker-list.page.scss"],
})
export class StickerListPage implements OnInit {
  domain: string;
  imageDict = {};
  imageArray = [];
  stickerArray = [];
  recentUse:RecentUseService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private global: GlobalDataService,
    private recent: RecentUseService
  ) {
    this.domain = this.router.url;
    this.domain = this.domain.substring(6);
    this.saveDomain();  // saves domain to local storage to be loaded by default
    var arr = [];
    var sticker_list:StickerConfig[] = [];
    for(var s of this.global.sticker_dict[this.domain]){
      sticker_list.push(s); 
    }

    // Construct a 2d array from the global array of images
    for (let x = 0; x < sticker_list.length; x++) {
      arr.push(sticker_list[x]);
      if (x % 3 == 2) {
        this.imageArray.push(arr);
        arr = [];
      }
    }
    // For now, add additional images to fill the blank space
    // this.imageArray.push(
    //   this.imageArray[0],
    //   this.imageArray[1],
    //   this.imageArray[2]
    // );

    this.recentUse = recent;
  }

  ngOnInit() {}

  saveDomain() {
    this.storage.set('domain', this.domain);
  }

  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsPage,
    })
    return await modal.present();
  }

  goToCreateStickerPage(config) {
    config.domain = this.domain;
    this.global.stickerInfo = config;
    this.router.navigate([
      'create-sticker',
      { },
    ]);
  }
}
