import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartModalPageRoutingModule } from './chart-modal-routing.module';

import { ChartModalPage } from './chart-modal.page';

import { ChartComponent } from "../chart/chart.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModalPageRoutingModule
  ],
  declarations: [
    ChartModalPage,
    ChartComponent,
  ]
})
export class ChartModalPageModule {}
