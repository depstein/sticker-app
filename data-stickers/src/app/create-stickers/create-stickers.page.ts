import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalDataService } from "./../global-data.service";
import { Health } from '@ionic-native/health/ngx';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { send } from 'process';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: "app-create-stickers",
  templateUrl: "./create-stickers.page.html",
  styleUrls: ["./create-stickers.page.scss"],
})
export class CreateStickersPage implements OnInit {
  img_list = [];
  health_test = '';
  expressBaseUrl:string = 'http://localhost:8888';
  spotifybutton:boolean;

  constructor(
    public alertController: AlertController,
    private router: Router,
    public route: ActivatedRoute,
    public global: GlobalDataService,
    private storage: Storage,
    private http: HttpClient,
    private spotifyService: SpotifyService
  ) {
    this.global.stickerInfo.image = this.route.snapshot.paramMap.get("img");
    this.global.stickerInfo.domain = this.route.snapshot.paramMap.get("domain");
    this.global.stickerInfo.value = 0;
    this.global.stickerInfo.music_value = "";
    this.global.stickerInfo.animation = "none";
    this.global.stickerInfo.hasGoal = false;
    this.global.stickerInfo.unit = Object.keys(
      this.global.domain_info[this.global.stickerInfo.domain].units
    )[0].trim();
    this.storage.get('spotifyPermission')
    .then((value) => {
      this.spotifybutton = value;
      if(this.global.stickerInfo.domain == "music" && (this.spotifybutton == false || this.spotifybutton == null)){
        this.presentAlertMultipleButtons();
      }
    })
    
    
    
    
  }

  ngOnInit() {}

  // Updates animation selection from animation-buttons component
  onAnimationChange(newAnimation: string) {
    this.global.stickerInfo.animation = newAnimation;
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

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      message: 'Do you want to get your playlist from spolify?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            console.log("open webpage");
            window.open("http://localhost:8888/login");
            this.storage.set('spotifyPermission', true);
          }
        },
        {
          text: 'NO'
        }],
    })
    await alert.present();
  }

}

