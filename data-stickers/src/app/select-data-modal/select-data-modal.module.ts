import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartModalPageRoutingModule } from './select-data-modal-routing.module';

import { SelectDataModalPage } from './select-data-modal.page';

import { ChartComponent } from "../chart/chart.component";


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
  ]
})
export class ChartModalPageModule {}
