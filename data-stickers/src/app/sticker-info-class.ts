export class StickerInfo {
	image: string;
	domain: string;
	value: number;
	unit: string;
	music_value: string;
	animation: string;
	hasGoal: boolean;
	goal: number;
	min:number;
	hour:number;
	milsec:number; 
	
	constructor() {
		this.image = '';
		this.domain = '';
		this.value = 0;
		this.unit = '';
		this.music_value = '';
		this.animation = 'none';
		this.hasGoal = false;
		this.goal = 0;
		this.min = 0;
		this.hour = 0

	}
}