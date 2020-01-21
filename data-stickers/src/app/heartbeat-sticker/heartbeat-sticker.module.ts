import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeartbeatStickerPageRoutingModule } from './heartbeat-sticker-routing.module';

import { HeartbeatStickerPage } from './heartbeat-sticker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeartbeatStickerPageRoutingModule
  ],
  declarations: [HeartbeatStickerPage]
})
export class HeartbeatStickerPageModule {}
