import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-segment',
  templateUrl: './time-segment.component.html',
  styleUrls: ['./time-segment.component.scss'],
})
export class TimeSegmentComponent implements OnInit {
  value: string;

  constructor() { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
