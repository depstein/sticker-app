import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
		loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) 
	},
  {
    path: 'steps',
    loadChildren: () => import('./pages/steps/steps.module').then( m => m.StepsPageModule),
		data: {
			preload: true
		}
  },
  {
    path: 'heartrate',
    loadChildren: () => import('./pages/heartrate/heartrate.module').then( m => m.HeartratePageModule),
		data: {
			preload: true
		}
  },
  {
    path: 'calories',
    loadChildren: () => import('./pages/calories/calories.module').then( m => m.CaloriesPageModule),
		data: {
			preload: true
		}
  },
  {
    path: 'time',
    loadChildren: () => import('./pages/time/time.module').then( m => m.TimePageModule),
		data: {
			preload: true
		}
		
  },
  {
    path: 'music',
    loadChildren: () => import('./pages/music/music.module').then( m => m.MusicPageModule),
		data: {
			preload: true
		}
  },
	{
		path: 'create-sticker',
		loadChildren: () => import('./create-stickers/create-stickers.module').then( m => m.CreateStickersPageModule)
	}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
