import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: 'steps',
				children: [{
					path: '',
					loadChildren: () => import('../pages/steps/steps.module').then(m => m.StepsPageModule)
				}]
			},
			{
				path: 'heartrate',
				children: [{
					path: '',
					loadChildren: () => import('../pages/heartrate/heartrate.module').then(m => m.HeartratePageModule)
				}]
			},
			{
				path: 'calories',
				children: [{
					path: '',
					loadChildren: () => import('../pages/calories/calories.module').then(m => m.CaloriesPageModule)
				}]
			},
			{
				path: 'time',
				children: [{
					path: '',
					loadChildren: () => import('../pages/time/time.module').then(m => m.TimePageModule)
				}]
			},
			{
				path: 'music',
				children: [{
					path: '',
					loadChildren: () => import('../pages/music/music.module').then(m => m.MusicPageModule)
				}]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomePageRoutingModule { }
