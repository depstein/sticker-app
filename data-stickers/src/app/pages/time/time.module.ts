import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimePageRoutingModule } from './time-routing.module';

import { TimePage } from './time.page';
import { NavigationbarComponent } from '../../navigationbar/navigationbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimePageRoutingModule
  ],
  declarations: [TimePage, NavigationbarComponent]
})
export class TimePageModule {}
