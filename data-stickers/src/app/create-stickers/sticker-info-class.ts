export class StickerInfo {
	image: string;
	domain: string;
	value: number;
	unit: string;
	music_value: string;
	animation: string;
	constructor(image: string, domain: string, value: number, unit: string, animation: string){
		this.image = image;
		this.domain = domain;
		this.value = value;
		this.unit = unit;
		this.animation = animation;
	}
}