import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'create-stickers', pathMatch: 'full' },
  
  {
    path: 'create-stickers',
    loadChildren: () => import('./create-stickers/create-stickers.module').then( m => m.CreateStickersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
