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
										loadChildren: () => import('../sticker-list/sticker-list.module').then(m => m.StickerListPageModule)
								}],
						},
						{
								path: 'heartrate',
								children: [{
										path: '',
										loadChildren: () => import('../sticker-list/sticker-list.module').then(m => m.StickerListPageModule)
								}]
						},
						{
								path: 'calories',
								children: [{
										path: '',
										loadChildren: () => import('../sticker-list/sticker-list.module').then(m => m.StickerListPageModule)
								}]
						},
						{
								path: 'time',
								children: [{
										path: '',
										loadChildren: () => import('../sticker-list/sticker-list.module').then(m => m.StickerListPageModule)
								}]
						},
						{
								path: 'music',
								children: [{
										path: '',
										loadChildren: () => import('../sticker-list/sticker-list.module').then(m => m.StickerListPageModule)
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
