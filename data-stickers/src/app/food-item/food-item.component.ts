import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() itemName: string;
  @Input() numCalories: number;
  @Input() totalCalories: number;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);

  constructor() { }

  ngOnInit() {}

  onCounterValueChanged(counterValue: number) {
    // this.totalCaloriesChanged.emit(this.numCalories * counterValue);
    this.totalCalories = this.numCalories * counterValue;
  }

}
