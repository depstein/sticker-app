import { Router } from "@angular/router";
import { Component, OnInit, Input} from "@angular/core";
import { GlobalDataService } from "./../global-data.service";
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: "app-recent-use",
  templateUrl: "./recent-use.component.html",
  styleUrls: ["./recent-use.component.scss"],
})
export class RecentUseComponent implements OnInit {
  @Input() stickerArray = [];
  @Input() domain;

  constructor(
    public global: GlobalDataService,
    public router: Router,
    private analyticsService: AnalyticsService
  ) {
  }
  ngOnInit(){
    console.log(this.stickerArray);
  }

  goToCreateStickerPage(this_img) {
    this.router.navigate([
      "create-sticker",
      { img: this_img, domain: this.domain },
    ]);
    // this.analyticsService.setUser();
    this.analyticsService.recentStickerButtonEvent(this_img, this.domain);
  }
}
