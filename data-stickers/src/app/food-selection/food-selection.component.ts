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
  totalNutrients: any;
  @Input() selectedNutrient: string;
  @Output() totalCaloriesChanged = new EventEmitter<number>(true);
  foodData: any;

  constructor(private foodDataService: FoodDataService) {
    this.totalCalories = 0;
    this.totalNutrients = {
      "calories": 0,
      "g fiber": 0,
      "g carbohydrate": 0,
      "g sodium": 0,
      "g sugar": 0
    };
  }

  onTotalCaloriesChanged(calorieChange: number) {
    this.totalCalories += calorieChange;
    this.totalCaloriesChanged.emit(this.totalCalories);
  }

  getFoodData(): void {
    console.log(this.queryText);

    this.foodDataService.searchForFoodItems(this.queryText)
    .subscribe(data => {
      let trimmedData = data['common'].slice(0, 5);
      this.foodData = trimmedData.map(item => {
        return {
          name: item.food_name,
          image: item.photo.thumb,
          nutrients: {
            "calories": 0,
            "g fiber": 0,
            "g carbohydrate": 0,
            "g sodium": 0,
            "g sugar": 0
          }
        }
      });

      var promises = trimmedData.map(item => {
        return this.foodDataService.getFoodData(item.food_name).toPromise()
        .then((nutritionData: any) => {
          console.log(nutritionData);

          return {
            name: item.food_name,
            image: item.photo.thumb,
            nutrients: {
              "calories": Math.round(nutritionData.foods[0].nf_calories),
              "g fiber": nutritionData.foods[0].nf_dietary_fiber,
              "g carbohydrate": nutritionData.foods[0].nf_total_carbohydrate,
              "g sodium": nutritionData.foods[0].nf_sodium,
              "g sugar": nutritionData.foods[0].nf_sugars
            }
          };
        });
      });

      Promise.all(promises).then(results => this.foodData = results);
    });
  }
}
