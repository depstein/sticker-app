import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartModalPageRoutingModule } from './select-data-modal-routing.module';

import { SelectDataModalPage } from './select-data-modal.page';

import { ChartComponent } from "../chart/chart.component";
import { FoodSelectionComponent } from "../food-selection/food-selection.component";
import { FoodItemComponent } from "../food-item/food-item.component";
import { CounterComponent } from "../counter/counter.component";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModalPageRoutingModule
  ],
  declarations: [
    SelectDataModalPage,
    ChartComponent,
    FoodSelectionComponent,
    FoodItemComponent,
    CounterComponent,
  ]
})
export class ChartModalPageModule {}
