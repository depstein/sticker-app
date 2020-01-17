import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStickersPageRoutingModule } from './create-stickers-routing.module';

import { CreateStickersPage } from './create-stickers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStickersPageRoutingModule
  ],
  declarations: [CreateStickersPage]
})
export class CreateStickersPageModule {}
