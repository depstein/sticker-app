import { ShareButtonComponent } from './../share-button/share-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStickersPageRoutingModule } from './create-stickers-routing.module';

import { CreateStickersPage } from './create-stickers.page';
import { InputComponent } from '../input/input.component';
import { StickerComponent } from '../sticker/sticker.component';
import { AnimationButtonsComponent } from '../animation-buttons/animation-buttons.component';
import { SendToSnapchatComponent } from '../send-to-snapchat/send-to-snapchat.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStickersPageRoutingModule
  ],
  declarations: [CreateStickersPage, SendToSnapchatComponent, InputComponent, StickerComponent, AnimationButtonsComponent, ShareButtonComponent]
})
export class CreateStickersPageModule {}
