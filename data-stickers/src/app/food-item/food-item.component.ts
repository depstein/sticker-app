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
  @Output() totalNutrientsChanged = new EventEmitter<any>(true);

  constructor() {}

  ngOnInit() {}

  onCounterValueChanged(counterValueChange: number) {
    this.totalNutrientsChanged.emit(generateNutrientObject(this.nutrients, counterValueChange));
  }

}

// Helper function outside of class
function generateNutrientObject(obj: any, counterValueChange: number) {
  return {
    "calories": Math.round(obj["calories"] * counterValueChange),
    "g fiber": roundTo2(obj["g fiber"] * counterValueChange),
    "g carbs": roundTo2(obj["g carbs"] * counterValueChange),
    "g sodium": roundTo2(obj["g sodium"] * counterValueChange),
    "g sugar": roundTo2(obj["g sugar"] * counterValueChange)
  };
}

function roundTo2(x: number) {
  return Math.round(x * 100) / 100
}
