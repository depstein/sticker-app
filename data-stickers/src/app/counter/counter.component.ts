import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from "./../global-data.service";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  constructor(public global: GlobalDataService) { }

  ngOnInit() {}

}
