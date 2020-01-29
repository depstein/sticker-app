import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

/* 
I'm trying to use ion tabs to set up the links at the bottom of the page but haven't gotten it to work yet. For now I have removed this page from the imports and am just using ion-button components for the links. 

Examples:
https://alligator.io/ionic/ionic-4-tabs/
https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/tabs-page/tabs-page-routing.module.ts
*/

const routes: Routes = [
	{
		path: 'home',
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
