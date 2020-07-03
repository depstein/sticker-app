import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';

@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrls: ['./color-buttons.component.scss'],
})
export class ColorButtonsComponent implements OnInit {

  colors = ['#C274D5', '#95DA48', '#F4C454', '#9BC7DE', '#ED6D68'];

  constructor(public global: GlobalDataService) { }

  ngOnInit() {}

  updateColor(color: string) {
    this.global.stickerInfo.color = color;
  }

}
