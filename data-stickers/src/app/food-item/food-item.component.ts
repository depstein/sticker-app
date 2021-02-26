import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() itemName: string;
  @Input() nutrients: any;
  @Input() selectedNutrient: string;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);

  constructor() {
  }

  ngOnInit() {}

  onCounterValueChanged(counterValueChange: number) {
    this.totalCaloriesChanged.emit(this.value * counterValueChange);
  }

}
