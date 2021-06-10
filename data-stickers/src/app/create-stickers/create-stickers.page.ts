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

@Component({
  selector: "app-create-stickers",
  templateUrl: "./create-stickers.page.html",
  styleUrls: ["./create-stickers.page.scss"],
})
export class CreateStickersPage implements OnInit {
  img_list = [];
  health_test = '';
  expressBaseUrl:string = 'https://sticker-spotify.herokuapp.com';
  spotifybutton:boolean;
  healthbutton:boolean;
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
    // this.storage.get('spotifyPermission')
    // .then((value) => {
    //   this.spotifybutton = value;
    //   if(this.global.stickerInfo.domain == "music" && (this.spotifybutton == false || this.spotifybutton == null) && this.global.asked == false){
    //     this.presentAlertspotifyButtons();
    //   }
    // })
    // this.storage.get('healthPermission')
    // .then((value) => {
    //   this.healthbutton = value;
    //   if(this.global.stickerInfo.domain == "steps" || this.global.stickerInfo.domain == "heartbeat"){
    //     this.presentAlerthealthButtons();
    //   }
    // })
    this.storage.get('spotifyPermission')
    .then((value) => {
      this.spotifybutton = value;
      if(this.global.stickerInfo.domain == "music" && (this.spotifybutton == false || this.spotifybutton == null) && this.global.asked == false){
        this.presentSettingSpotifyAlert();
      }
    })
    this.storage.get('healthPermission')
    .then((value) => {
      this.healthbutton = value;
      if((this.global.stickerInfo.domain == "steps" || this.global.stickerInfo.domain == "heartbeat") && (this.healthbutton == false || this.healthbutton == null) && this.global.asked == false){
        this.presentSettingHealthAlert();
      }
    })
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

  async presentAlertspotifyButtons() {
    const alert = await this.alertController.create({
      message: 'Do you want to get your playlist from spolify?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            console.log("open webpage");
            window.open("https://sticker-spotify.herokuapp.com/login", "_self");
            this.storage.set('spotifyPermission', true);
          }
        },
        {
          text: 'NO',
          handler:() =>{
            this.global.asked = true;
            console.log(this.global.asked);
          }

        }],
    })
    await alert.present();
  }
  async presentAlerthealthButtons(){
    const alert = await this.alertController.create({
      message: 'Do you want to get your data from Healthkit?',
      buttons: [
        {
          text: 'YES'
        },
        {
          text: 'NO'
        }],
    })
    await alert.present();
  }

  async presentSettingHealthAlert(){
    const alert = await this.alertController.create({
      message: 'Permission to health data not granted. Please set up permission in \'Setting\'',
      buttons: [
        // {
        //   text: 'YES'
        // },
        {
          text: 'Okay'
        }],
    })
    await alert.present();
  }

  async presentSettingSpotifyAlert(){
    const alert = await this.alertController.create({
      message: 'Permission to Spotify data not granted. Please set up permission in \'Setting\'',
      buttons: [
        // {
        //   text: 'YES'
        // },
        {
          text: 'Okay'
        }],
    })
    await alert.present();
  }


}
