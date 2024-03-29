import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from './../global-data.service';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrls: ['./color-buttons.component.scss'],
})
export class ColorButtonsComponent implements OnInit {
  enabled = this.analyticsService.analyticsEnabled;
	@Output() changeColor:EventEmitter<any> = new EventEmitter();
  color_map = {};

  colors = [];

  constructor(public global: GlobalDataService, private analyticsService: AnalyticsService) { }

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
    // this.analyticsService.setUser();
    this.analyticsService.colorButtonEvent(color);
    this.changeColor.emit(color);
  }
  // logEvent(color: string) {
  //   this.analyticsService.logEvent(color);
  // }

}
