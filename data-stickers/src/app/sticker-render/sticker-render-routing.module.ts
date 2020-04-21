import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StickerRenderPage } from './sticker-render.page';

const routes: Routes = [
  {
    path: '',
    component: StickerRenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickerRenderPageRoutingModule {}
