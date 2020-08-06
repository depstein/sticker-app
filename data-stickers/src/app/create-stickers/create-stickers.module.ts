

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateStickersPageRoutingModule } from "./create-stickers-routing.module";

import { CreateStickersPage } from "./create-stickers.page";
import { InputComponent } from "../input/input.component";
import { StickerComponent } from "../sticker/sticker.component";
import { AnimationButtonsComponent } from "../animation-buttons/animation-buttons.component";
import { ColorButtonsComponent } from "../color-buttons/color-buttons.component";
import { TimeSegmentComponent } from "../time-segment/time-segment.component";
import { ChartComponent } from "../chart/chart.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStickersPageRoutingModule,
  ],
  declarations: [
    CreateStickersPage,
    InputComponent,
    StickerComponent,
    AnimationButtonsComponent,
    ColorButtonsComponent,
    TimeSegmentComponent,
    ChartComponent,
  ],
})
export class CreateStickersPageModule {}
