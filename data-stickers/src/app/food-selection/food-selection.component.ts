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

    this.foodDataService.getFoodData(this.queryText)
    .subscribe(data => {
      this.foodData = data["branded"].map(item => {
        return {
          name: item.brand_name_item_name,
          image: item.photo.thumb,
          calories: item.nf_calories
        }
      });
    });
  }
}
