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
  @Input() selectedMeasurement: string;
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
      let trimmedData = data['common'].slice(0, 5);
      this.foodData = trimmedData.map(item => {
        return {
          name: item.food_name,
          image: item.photo.thumb,
          nutrients: {
            calories: 0,
            cholesterol: 0,
            fiber: 0,
            potassium: 0,
            fat: 0,
            carbohydrate: 0,
            sodium: 0,
            sugar: 0
          }
        }
      });

      var promises = trimmedData.map(item => {
        return this.foodDataService.getFoodData(item.food_name).toPromise()
        .then((nutritionData: any) => {
          console.log(nutritionData);

// nf_calories: 94.64

// nf_cholesterol: 0
//
// nf_dietary_fiber: 4.37
//
// nf_p: 20.02
//
// nf_potassium: 194.74
//
// nf_protein: 0.47
//
// nf_saturated_fat: 0.05
//
// nf_sodium: 1.82
//
// nf_sugars: 18.91
//
// nf_total_carbohydrate: 25.13
//
// nf_total_fat: 0.31

          return {
            name: item.food_name,
            image: item.photo.thumb,
            nutrients: {
              calories: Math.round(nutritionData.foods[0].nf_calories),
              cholesterol: nutritionData.foods[0].nf_cholesterol,
              fiber: nutritionData.foods[0].nf_dietary_fiber,
              potassium: nutritionData.foods[0].nf_potassium,
              fat: nutritionData.foods[0].nf_total_fat,
              carbohydrate: nutritionData.foods[0].nf_total_carbohydrate,
              sodium: nutritionData.foods[0].nf_sodium,
              sugar: nutritionData.foods[0].nf_sugars
            }
            // calories: Math.round(nutritionData.foods[0].nf_calories)
          };
        });
      });

      Promise.all(promises).then(results => this.foodData = results);
    });
  }
}
