

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateStickersPageRoutingModule } from "./create-stickers-routing.module";

import { ChartModalPageModule } from '../chart-modal/chart-modal.module';

import { CreateStickersPage } from "./create-stickers.page";
import { InputComponent } from "../input/input.component";
import { StickerComponent } from "../sticker/sticker.component";
import { AnimationButtonsComponent } from "../animation-buttons/animation-buttons.component";
import { ColorButtonsComponent } from "../color-buttons/color-buttons.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStickersPageRoutingModule,
    ChartModalPageModule,
  ],
  declarations: [
    CreateStickersPage,
    InputComponent,
    StickerComponent,
    AnimationButtonsComponent,
    ColorButtonsComponent,
  ],
})
export class CreateStickersPageModule {}
