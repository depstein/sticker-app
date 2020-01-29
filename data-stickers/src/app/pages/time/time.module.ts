import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimePageRoutingModule } from './time-routing.module';

import { TimePage } from './time.page';
import { NavigationbarModule } from '../../navigationbar/navigationbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimePageRoutingModule,
	NavigationbarModule
  ],
  declarations: [TimePage]
})
export class TimePageModule {}
