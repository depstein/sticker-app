import { Router } from "@angular/router";
import { Component, OnInit, Input} from "@angular/core";
import { GlobalDataService } from "./../global-data.service";
import { AnalyticsService } from '../analytics.service';
import { StickerConfig } from '../sticker-configs/sticker-config';

@Component({
  selector: "app-recent-use",
  templateUrl: "./recent-use.component.html",
  styleUrls: ["./recent-use.component.scss"],
})
export class RecentUseComponent implements OnInit {
  @Input() stickerArray:string[] = [];

  constructor(
    public global: GlobalDataService,
    public router: Router,
    private analyticsService: AnalyticsService
  ) {
  }
  ngOnInit(){
  }


  goToCreateStickerPage(image:string) {
    //It's not great that this is being hacked from the file path, but it should work...
    console.log(image);
    this.global.stickerInfo.domain = image.substring(image.indexOf('stickers/') + 9, image.lastIndexOf('/'));
    // TODO: need to check if the variation parameter is stored. 
    var config = this.global.sticker_dict[this.global.stickerInfo.domain].find(config => {
      return image.includes(config.imageURL);
    });
    if(config) {
      this.global.stickerInfo = config;
      this.router.navigate([
        "create-sticker",
        { },
      ]);
    } else {
      //Something went wrong, the config isn't in our list
      console.log("Config not present: " + image);
    }
    this.analyticsService.recentStickerButtonEvent(image, this.global.stickerInfo.domain);
  }
}
