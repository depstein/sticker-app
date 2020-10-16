import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'create-sticker',
        loadChildren: () => import('./create-stickers/create-stickers.module').then(m => m.CreateStickersPageModule)
    },
  {
    path: 'sticker-list',
    loadChildren: () => import('./sticker-list/sticker-list.module').then( m => m.StickerListPageModule)
  },
  {
    path: 'sticker-render',
    loadChildren: () => import('./sticker-render/sticker-render.module').then( m => m.StickerRenderPageModule)
  },  {
    path: 'settings',
    loadChildren: () => import('./modals/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modals/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'selectunit',
    loadChildren: () => import('./modals/selectunit/selectunit.module').then( m => m.SelectunitPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
