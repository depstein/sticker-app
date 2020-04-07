import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickerRenderPageRoutingModule } from './sticker-render-routing.module';

import { StickerRenderPage } from './sticker-render.page';
import { SendToSnapchatComponent } from '../send-to-snapchat/send-to-snapchat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerRenderPageRoutingModule
  ],
  declarations: [StickerRenderPage, SendToSnapchatComponent]
})
export class StickerRenderPageModule {}
