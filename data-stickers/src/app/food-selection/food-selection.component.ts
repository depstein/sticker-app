import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FoodDataService } from '../food-data.service';

@Component({
  selector: 'app-food-selection',
  templateUrl: './food-selection.component.html',
  styleUrls: ['./food-selection.component.scss'],
})
export class FoodSelectionComponent implements OnInit {

  totalCalories: number;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);
  foodData: Any;

  constructor(private foodDataService: FoodDataService) {
    this.totalCalories = 0;
  }

  ngOnInit() {
    this.getFoodData();
  }

  onTotalCaloriesChanged(calorieChange: number) {
    this.totalCalories += calorieChange;
    this.totalCaloriesChanged.emit(this.totalCalories);
  }

  getFoodData(): void {
    this.foodData = this.foodDataService.getFoodData();
  }

}
