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
  option:any;
  type:any[] =[];

  constructor(public modalController: ModalController) { 

  }

  ngOnInit() {
    
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  typeChanged(selected:any){
    if(selected["detail"]["value"] == "songs"){
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
    else if (selected["detail"]["value"] == "albums"){
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
    else if (selected["detail"]["value"]== "artists"){
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
}
