import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GlobalDataService } from "./../global-data.service";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  @Input() counterValue: number;
  @Output() counterValueChanged = new EventEmitter<number>(true);

  constructor(public global: GlobalDataService) { }

  ngOnInit() {}

  increment() {
    this.counterValue++;
    this.counterValueChanged.emit(this.counterValue);
  }

  decrement() {
    this.counterValue--;
    this.counterValueChanged.emit(this.counterValue);
  }

}
