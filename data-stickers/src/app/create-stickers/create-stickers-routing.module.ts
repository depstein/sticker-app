import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStickersPage } from './create-stickers.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStickersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStickersPageRoutingModule {}
