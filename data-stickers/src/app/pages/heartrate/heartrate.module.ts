import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeartratePageRoutingModule } from './heartrate-routing.module';

import { HeartratePage } from './heartrate.page';
import { NavigationbarComponent } from '../../navigationbar/navigationbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeartratePageRoutingModule
  ],
  declarations: [HeartratePage, NavigationbarComponent]
})
export class HeartratePageModule {}
