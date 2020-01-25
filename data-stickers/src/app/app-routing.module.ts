import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
	loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) 
  },
  {
    path: 'steps',
    loadChildren: () => import('./pages/steps/steps.module').then( m => m.StepsPageModule)
  },
  {
    path: 'heartrate',
    loadChildren: () => import('./pages/heartrate/heartrate.module').then( m => m.HeartratePageModule)
  },
  {
    path: 'calories',
    loadChildren: () => import('./pages/calories/calories.module').then( m => m.CaloriesPageModule)
  },
  {
    path: 'time',
    loadChildren: () => import('./pages/time/time.module').then( m => m.TimePageModule)
  },
  {
    path: 'music',
    loadChildren: () => import('./pages/music/music.module').then( m => m.MusicPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
