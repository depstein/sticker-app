import { Router } from "@angular/router";
import { Component, OnInit, Input,SimpleChanges } from "@angular/core";
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

  ngOnInit() {
    this.getRecentUse();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(666);
    console.log(changes);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

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
