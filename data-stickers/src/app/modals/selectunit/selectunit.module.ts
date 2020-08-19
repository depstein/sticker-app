import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectunitPageRoutingModule } from './selectunit-routing.module';

import { SelectunitPage } from './selectunit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectunitPageRoutingModule
  ],
  declarations: [SelectunitPage],
  entryComponents: [SelectunitPage]
})
export class SelectunitPageModule {}
