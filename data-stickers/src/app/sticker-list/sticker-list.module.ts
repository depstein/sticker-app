import { RecentUseComponent } from './../recent-use/recent-use.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StickerListPageRoutingModule } from './sticker-list-routing.module';
import { StickerListPage } from './sticker-list.page';
import { SettingsPage } from '../modals/settings/settings.page'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerListPageRoutingModule
  ],
  declarations: [StickerListPage, RecentUseComponent, SettingsPage],
  entryComponents: [SettingsPage]
})
export class StickerListPageModule {}
