export class StickerInfo {
	image: string;
	domain: string;
	value: number;
	unit: string;
	music_value: string;
	animation: string;
	hasGoal: boolean;

	constructor(image: string, domain: string, value: number, unit: string, animation: string, goal: boolean){
		this.image = image;
		this.domain = domain;
		this.value = value;
		this.unit = unit;
		this.animation = animation;
		this.hasGoal = goal;
	}
}