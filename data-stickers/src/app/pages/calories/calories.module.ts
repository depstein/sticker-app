import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaloriesPageRoutingModule } from './calories-routing.module';

import { CaloriesPage } from './calories.page';
import { NavigationbarComponent } from '../../navigationbar/navigationbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaloriesPageRoutingModule
  ],
  declarations: [CaloriesPage, NavigationbarComponent]
})
export class CaloriesPageModule {}
