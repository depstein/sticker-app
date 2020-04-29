import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { GlobalDataService } from "./../global-data.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-recent-use",
  templateUrl: "./recent-use.component.html",
  styleUrls: ["./recent-use.component.scss"],
})
export class RecentUseComponent implements OnInit {
  stickerArray = [];
  @Input() domain;

  constructor(
    public global: GlobalDataService,
    public router: Router,
    private storage: Storage
  ) {
    this.getRecentUse();
  }

  ngAfterContentInit() {
    console.log("Recent Use ngDoCheck");
    this.getRecentUse();
  }

  ngOnInit() {}

  goToCreateStickerPage(this_img) {
    this.router.navigate([
      "create-sticker",
      { img: this_img, domain: this.domain },
    ]);
  }

  getRecentUse() {
    console.log("Calling getRecentUsed()");
    this.storage.get("recentUse").then((value) => {
      this.stickerArray = JSON.parse(value);
      console.log(this.stickerArray);
    });

    /*
    .then((value) => {
      console.log(JSON.parse(value));
      this.stickerArray = JSON.parse(value); 
    })
    */
  }
}
