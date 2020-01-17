import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicPageRoutingModule } from './music-routing.module';

import { MusicPage } from './music.page';
import { NavigationbarComponent } from '../../navigationbar/navigationbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicPageRoutingModule
  ],
  declarations: [MusicPage, NavigationbarComponent]
})
export class MusicPageModule {}
