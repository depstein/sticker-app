import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeartbeatStickerPage } from './heartbeat-sticker.page';

const routes: Routes = [
  {
    path: '',
    component: HeartbeatStickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeartbeatStickerPageRoutingModule {}
