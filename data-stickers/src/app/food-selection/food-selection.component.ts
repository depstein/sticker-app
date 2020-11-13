import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-selection',
  templateUrl: './food-selection.component.html',
  styleUrls: ['./food-selection.component.scss'],
})
export class FoodSelectionComponent implements OnInit {

  totalCalories: number;

  constructor() {
    this.totalCalories = 0;
  }

  ngOnInit() {}

  onTotalCaloriesChanged(calorieChange: number) {
    this.totalCalories += calorieChange;
    console.log(this.totalCalories);

  }

}
