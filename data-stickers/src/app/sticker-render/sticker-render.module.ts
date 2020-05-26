import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ShareButtonComponent } from "./../share-button/share-button.component";
import { StickerRenderPageRoutingModule } from './sticker-render-routing.module';

import { StickerRenderPage } from './sticker-render.page';
import { SendToSnapchatComponent } from '../send-to-snapchat/send-to-snapchat.component';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerRenderPageRoutingModule
  ],
  declarations: [StickerRenderPage, SendToSnapchatComponent,ShareButtonComponent]
})
export class StickerRenderPageModule {}
