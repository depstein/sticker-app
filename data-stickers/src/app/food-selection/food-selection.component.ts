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
  @Output() totalNutrientsChanged = new EventEmitter<any>(true);
  foodData: any;

  constructor(private foodDataService: FoodDataService) {
    this.totalNutrients = {
      "calories": 0,
      "g fiber": 0,
      "g carbs": 0,
      "g sodium": 0,
      "g sugar": 0
    };
  }

  onTotalNutrientsChanged(nutrientChange: any) {
    this.totalNutrients = addNutrients(this.totalNutrients, nutrientChange);
    this.totalNutrientsChanged.emit(this.totalNutrients);
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
            "g carbs": 0,
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
              "g fiber": roundTo2(nutritionData.foods[0].nf_dietary_fiber),
              "g carbs": roundTo2(nutritionData.foods[0].nf_total_carbohydrate),
              "g sodium": roundTo2(nutritionData.foods[0].nf_sodium),
              "g sugar": roundTo2(nutritionData.foods[0].nf_sugars)
            }
          };
        });
      });

      Promise.all(promises).then(results => this.foodData = results);
    });
  }

}

// Helper functions outside of class
function addNutrients(obj1, obj2) {
  return {
    "calories": Math.round(obj1["calories"] + obj2["calories"]),
    "g fiber": roundTo2(obj1["g fiber"] + obj2["g fiber"]),
    "g carbs": roundTo2(obj1["g carbs"] + obj2["g carbs"]),
    "g sodium": roundTo2(obj1["g sodium"] + obj2["g sodium"]),
    "g sugar": roundTo2(obj1["g sugar"] + obj2["g sugar"])
  };
}

function roundTo2(x: number) {
  return Math.round(x * 100) / 100
}
