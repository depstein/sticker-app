import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StepsPageRoutingModule } from './steps-routing.module';

import { StepsPage } from './steps.page';
import { NavigationbarModule } from '../../navigationbar/navigationbar.module';
import { CreateStickersPageModule } from '../../create-stickers/create-stickers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsPageRoutingModule,
		NavigationbarModule,
		CreateStickersPageModule
  ],
  declarations: [StepsPage]
})
export class StepsPageModule {}


