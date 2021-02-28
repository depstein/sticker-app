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

  constructor() {
  }

  ngOnInit() {}

  onCounterValueChanged(counterValueChange: number) {
    console.log(counterValueChange);

    const result = generateNutrientObject(this.nutrients, counterValueChange);
    console.log('onCounterValueChanged result:');
    console.log(result);
    this.totalNutrientsChanged.emit(result);
    // this.totalNutrientsChanged.emit(this.value * counterValueChange);
  }

}

// Helper function outside of class
function generateNutrientObject(obj: any, counterValueChange: number) {
  return {
    "calories": obj["calories"] * counterValueChange,
    "g fiber": obj["g fiber"] * counterValueChange,
    "g carbohydrate": obj["g carbohydrate"] * counterValueChange,
    "g sodium": obj["g sodium"] * counterValueChange,
    "g sugar": obj["g sugar"] * counterValueChange
  };
}
