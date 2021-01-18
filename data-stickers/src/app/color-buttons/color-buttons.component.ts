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
  colors = ['#C274D5', '#95DA48', '#F4C454', '#9BC7DE', '#ED6D68'];

  constructor(public global: GlobalDataService, private analyticsService: AnalyticsService) { }

  ngOnInit() {}

  updateColor(color: string) {
    this.global.stickerInfo.color = color;
    this.analyticsService.setUser();
    this.analyticsService.colorButtonEvent(color);
  }
  // logEvent(color: string) {
  //   this.analyticsService.logEvent(color);
  // }

}
