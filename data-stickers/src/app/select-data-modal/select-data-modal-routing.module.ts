import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDataModalPage } from './select-data-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDataModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartModalPageRoutingModule {}
