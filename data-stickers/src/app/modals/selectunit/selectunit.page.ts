import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpotifyService } from '../../spotify.service';
import { GlobalDataService} from '../../global-data.service';

@Component({
  selector: 'app-selectunit',
  templateUrl: './selectunit.page.html',
  styleUrls: ['./selectunit.page.scss'],
})
export class SelectunitPage implements OnInit {
  @Input() content;
  @Input() record;
  @Output() unitSelected = new EventEmitter<{unit: string, value: number, title: string}>();

  constructor(public modalController: ModalController,private spotifyService: SpotifyService, private global: GlobalDataService) { }

  ngOnInit() {

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onSelectButtonClicked(unit: string) {
    console.log('SelectUnitPage:onSendButtonClicked');
    this.unitSelected.emit({ unit, value: this.record[unit], title: this.content})
    this.global.stickerInfo.unit = unit;
    this.modalController.dismiss();
  }
  
}
