import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalDataService } from "./../global-data.service";
import { Health } from '@ionic-native/health/ngx';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { send } from 'process';
import { SpotifyService } from '../spotify.service';
import { StickerComponent } from '../sticker/sticker.component';
import { environment } from './../../environments/environment';

@Component({
  selector: "app-create-stickers",
  templateUrl: "./create-stickers.page.html",
  styleUrls: ["./create-stickers.page.scss"],
})
export class CreateStickersPage implements OnInit {
  img_list = [];
  health_test = '';
  expressBaseUrl:string = environment.spotifyServerURL;
  @ViewChild(StickerComponent, {static:true}) stickerComponent;

  constructor(
    public alertController: AlertController,
    private router: Router,
    public route: ActivatedRoute,
    public global: GlobalDataService,
    private storage: Storage,
    private http: HttpClient,
    private spotifyService: SpotifyService
  ) {

  }

  ngOnInit() {
    this.global.stickerInfo.color = "red";
    this.global.stickerInfo.value = 0;
    this.global.stickerInfo.animation = "pulse";
    this.global.stickerInfo.hasGoal = false;
    this.global.stickerInfo.unit = this.global.domain_info[this.global.stickerInfo.domain].units[0].trim();
  }

  rerender(args:any) {
    if(args == "toggleGoal") {
      this.stickerComponent.loadSticker();
    } else {
      this.stickerComponent.rerender();
    }
  }

  /*testHealth() {
    this.health.isAvailable()
    .then((available:boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight']  //write only permission
        }
      ])
      .then((res) => {
        console.log(res);
        this.health_test = res;
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }*/

  goToStickerRenderPage() {
    this.router.navigate(["sticker-render", {}]);
  }

}
