import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';

@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrls: ['./color-buttons.component.scss'],
})
export class ColorButtonsComponent implements OnInit {
	@Output() changeColor:EventEmitter<any> = new EventEmitter();
  color_map = {};

  colors = [];

  constructor(public global: GlobalDataService) { }

  ngOnInit() {
    this.colors = Object.keys(this.global.stickerInfo.colorMap);
    this.colors.forEach(color => {
      if('main' in this.global.stickerInfo.colorMap[color]) {
        this.color_map[color] = this.global.stickerInfo.colorMap[color]['main'];
      } else {
        //Just grab a random string.. it's probably fine.
        this.color_map[color] = this.global.stickerInfo.colorMap[color][Object.keys(this.global.stickerInfo.colorMap)[0]];
      }
    });
  }

  updateColor(color: string) {
    this.global.stickerInfo.color = color;
    this.changeColor.emit(color);
  }

}
