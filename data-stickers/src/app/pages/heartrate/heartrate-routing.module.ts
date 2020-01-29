import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeartratePage } from './heartrate.page';

const routes: Routes = [
  {
    path: '',
    component: HeartratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeartratePageRoutingModule {}
