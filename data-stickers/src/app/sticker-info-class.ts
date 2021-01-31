import { StickerConfig } from './sticker-configs/sticker-config';

export class StickerInfo {
	config:StickerConfig;
	color: string;
	domain: string;
	value: number;
	unit: string;
	music_value: string;
	animation: string;
	hasGoal: boolean;
	goal: number;
	min:number;
	hour:number;
	goal_min:number;
	goal_hour:number;

	constructor() {
		this.color = '';
		this.domain = '';
		this.value = 0;
		this.unit = '';
		this.music_value = '';
		this.animation = 'none';
		this.hasGoal = false;
		this.goal = 0;
		this.min = 0;
		this.hour = 0;
		this.goal_min = 0;
		this.goal_hour = 0;
	}
}
