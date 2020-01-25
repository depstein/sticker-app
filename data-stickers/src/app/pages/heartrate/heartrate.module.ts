import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeartratePageRoutingModule } from './heartrate-routing.module';

import { HeartratePage } from './heartrate.page';
import { NavigationbarModule } from '../../navigationbar/navigationbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeartratePageRoutingModule,
	NavigationbarModule
  ],
  declarations: [HeartratePage]
})
export class HeartratePageModule {}
