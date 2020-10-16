import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpotifyService } from '../../spotify.service';

@Component({
  selector: 'app-selectunit',
  templateUrl: './selectunit.page.html',
  styleUrls: ['./selectunit.page.scss'],
})
export class SelectunitPage implements OnInit {
  @Input() content;
  @Input() record;
  constructor(public modalController: ModalController,private spotifyService: SpotifyService) { }

  ngOnInit() {

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  
}
