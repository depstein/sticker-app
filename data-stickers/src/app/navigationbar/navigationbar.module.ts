import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigationbarComponent } from './navigationbar.component';

@NgModule({
  declarations: [NavigationbarComponent],
  exports: [NavigationbarComponent],
  imports: [
    CommonModule,
	FormsModule,
	IonicModule
  ]
})
export class NavigationbarModule { }
