import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-food-selection',
  templateUrl: './food-selection.component.html',
  styleUrls: ['./food-selection.component.scss'],
})
export class FoodSelectionComponent implements OnInit {

  totalCalories: number;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);

  constructor() {
    this.totalCalories = 0;
  }

  ngOnInit() {}

  onTotalCaloriesChanged(calorieChange: number) {
    this.totalCalories += calorieChange;
    this.totalCaloriesChanged.emit(this.totalCalories);
  }

}
