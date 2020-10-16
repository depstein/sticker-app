import { RecentUseComponent } from './../recent-use/recent-use.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StickerListPageRoutingModule } from './sticker-list-routing.module';
import { StickerListPage } from './sticker-list.page';
import { SettingsPageModule } from '../modals/settings/settings.module';
import { SettingsPage } from '../modals/settings/settings.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerListPageRoutingModule,
    SettingsPageModule
  ],
  declarations: [StickerListPage, RecentUseComponent],
  entryComponents: [SettingsPage]
})
export class StickerListPageModule {}
