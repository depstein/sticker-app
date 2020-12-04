import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectunitPage} from '../../modals/selectunit/selectunit.page';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() songName:any[];
  @Input() artists:any[];
  @Input() albums:any[];
  @Input() hour:any[];
  @Input() day:any[];
  @Input() week:any[];
  @Input() month:any[];
  
  
  option:any;
  type:any[] =[];
  selectUnit:any;
  currentCategory:any;

  constructor(public modalController: ModalController) { 
     
  }

  ngOnInit() {
    this.option = "songs";
    this.selectUnit = "month";
    // set the default selection (SongName and LastMonth)
    let songName = {"songName":{'times':1,"minutes":0,"hours":0}};
    songName = this.month[0];
    let arr = [];
      if(songName != null){
        for(var songname of Object.keys(songName) ){
          if(songname != undefined && songname != null && songname != "songName"){
            arr.push(songname);
          }
        }
      }
      this.type = arr;
    
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //selected type changed
  typeChanged(selected:any){
    this.currentCategory = selected["detail"]["value"] ;
    if(this.currentCategory == "songs"){
      let arr1 = [];
      if(this.songName != null){
        for(var songname of Object.keys(this.songName) ){
          if(songname != undefined && songname != null && songname != "songName"){
            arr1.push(songname);
          } 
        }
      }
      this.type = arr1;
      
    }
    else if (this.currentCategory == "albums"){
      let arr2 = []
      if(this.albums != null){
        for(var al of Object.keys(this.albums) ){
          if(al != undefined && al != null && al != "albums"){
            arr2.push(al);
          }
        }
      }
      this.type = arr2;
    }
    else if (this.currentCategory== "artists"){
      let arr3 = [];
      if(this.artists != null){
        for(var at of Object.keys(this.artists) ){
          if(at != undefined && at != null && at != "artistName"){
            arr3.push(at);
          }
        }
      }
      this.type = arr3;
    }
    
   
  }

  async presentModal(item) {
    let record:Object;
    
    // console.log( typeof(item),"lala",this.songName[String(item)]);
  
    if(Object.keys(this.songName).includes(item)){
        
        record = this.songName[item];
      
    }
    else if(Object.keys(this.artists).includes(item)){
        record = this.artists[item];
      }
    else if (Object.keys(this.albums).includes(item)){
        record = this.albums[item];
      }
    
      
    const modal = await this.modalController.create({
      component: SelectunitPage,
      cssClass: 'my-custom-class',
      componentProps: {
        "content":item,
        "record":record
      }
    });
    return await modal.present();
  }
  // e.g. day[0] = songName for lastDay, day[1] = artists for lastDay, day[2] = albums for last Month
  unitChanged(selected:any){
    let songName = {"songName":{'times':1,"minutes":0,"hours":0}};
    let artists= {"artistName":{'times':1,"minutes":0,"hours":0}};
    let albums = {"albums":{'times':1,"minutes":0,"hours":0}};
    this.selectUnit =  selected["detail"]["value"];
    if( this.selectUnit == "hour"){
      songName = this.hour[0];
      artists = this.hour[1];
      albums = this.hour[2];
    }else if(this.selectUnit == "day"){
      songName = this.day[0];
      artists = this.day[1];
      albums = this.day[2];
    }else if(this.selectUnit == "week"){
      songName = this.week[0];
      artists = this.week[1];
      albums = this.week[2];
    }else if(this.selectUnit== "month"){
      songName = this.month[0];
      artists = this.month[1];
      albums = this.month[2];
    }
    //change what will show in HTML according the current category based on the selected time range above.
    if(this.currentCategory == "songs"){
      let arr1 = [];
      if(songName != null){
        for(var songname of Object.keys(songName) ){
          if(songname != undefined && songname != null && songname != "songName"){
            arr1.push(songname);
          }
        }
      }
      this.type = arr1;
    }
    else if (this.currentCategory == "albums"){
      let arr2 = []
      if(albums != null){
        for(var al of Object.keys(albums) ){
          if(al != undefined && al != null && al != "albums"){
            arr2.push(al);
          }
        }
      }
      this.type = arr2;
    }
    else if (this.currentCategory== "artists"){
      let arr3 = [];
      if(artists != null){
        for(var at of Object.keys(artists) ){
          if(at != undefined && at != null && at != "artistName"){
            arr3.push(at);
          }
        }
      }
      this.type = arr3;
    }

  }
}
