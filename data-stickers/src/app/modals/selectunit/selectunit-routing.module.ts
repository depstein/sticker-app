import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectunitPage } from './selectunit.page';

const routes: Routes = [
  {
    path: '',
    component: SelectunitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectunitPageRoutingModule {}
