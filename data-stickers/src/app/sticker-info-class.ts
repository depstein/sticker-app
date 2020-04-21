export class StickerInfo {
	image: string;
	domain: string;
	value: number;
	unit: string;
	music_value: string;
	animation: string;
	hasGoal: boolean;

	constructor() {
		this.image = '';
		this.domain = '';
		this.value = 0;
		this.unit = '';
		this.music_value = '';
		this.animation = 'none';
		this.hasGoal = false;
	}
}