import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodDataService } from '../food-data.service';

@Component({
  selector: 'app-food-selection',
  templateUrl: './food-selection.component.html',
  styleUrls: ['./food-selection.component.scss'],
})
export class FoodSelectionComponent {
  queryText: string;
  totalCalories: number;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);
  foodData: any;

  constructor(private foodDataService: FoodDataService) {
    this.totalCalories = 0;
  }

  onTotalCaloriesChanged(calorieChange: number) {
    this.totalCalories += calorieChange;
    this.totalCaloriesChanged.emit(this.totalCalories);
  }

  getFoodData(): void {
    console.log(this.queryText);

    this.foodDataService.searchForFoodItems(this.queryText)
    .subscribe(data => {
      console.log(data);

      this.foodData = data["common"].map(item => {
        let result;
        this.foodDataService.getFoodData(item.food_name)
        .subscribe(nutritionData => {
          console.log(nutritionData);
          result = {
            name: item.food_name,
            image: item.photo.thumb,
            calories: item.nf_calories
          };
        });
        return result;
      });
    });
  }
}
