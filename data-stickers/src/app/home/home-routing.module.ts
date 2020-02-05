import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

/* 
I'm trying to use ion-tabs but haven't gotten it to work yet. For now I have removed this page from the imports and am just using ion-button components for the links. 

Examples for ion-tabs:
https://ionicacademy.com/ionic-routing-navigation/
https://alligator.io/ionic/ionic-4-tabs/
https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/tabs-page/tabs-page-routing.module.ts
*/

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: 'steps',
				children: [{
					path: '',
					loadChildren: '../pages/steps/steps.module#StepsPageModule'
				}]
			},
			{
				path: 'heartrate',
				children: [{
					path: '',
					loadChildren: '../pages/heartrate/heartrate.module#HeartratePageModule'
				}]
			},
			{
				path: 'calories',
				children: [{
					path: '',
					loadChildren: '../pages/calories/calories.module#CaloriesPageModule'
				}]
			},
			{
				path: 'time',
				children: [{
					path: '',
					loadChildren: '../pages/time/time.module#TimePageModule'
				}]
			},
			{
				path: 'music',
				children: [{
					path: '',
					loadChildren: '../pages/music/music.module#MusicPageModule'
				}]
			}
		],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomePageRoutingModule { }
