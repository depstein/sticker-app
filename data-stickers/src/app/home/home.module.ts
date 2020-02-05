import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NavigationbarModule } from '../navigationbar/navigationbar.module';
import { HomePageRoutingModule } from  './home-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
		NavigationbarModule,
		HomePageRoutingModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
