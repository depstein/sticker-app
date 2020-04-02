import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {
	@Input() animation;
	@Output() animation_changed = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

	noAnimation() {
		if (this.animation != "none") {
			this.animation = "none";
			this.animation_changed.emit(this.animation);
		}
	}

	pulseAnimation() {
		if (this.animation == "pulse") {
			this.animation = "none";
		} else {
			this.animation = "pulse";
		}
		this.animation_changed.emit(this.animation);
	}

	shakeAnimation() {
		if (this.animation == "shake") {
			this.animation = "none";
		} else {
			this.animation = "shake";
		}
		this.animation_changed.emit(this.animation);
	}

	fillAnimation() {
		if (this.animation == "fill") {
			this.animation = "none";
		} else {
			this.animation = "fill";
		}
		this.animation_changed.emit(this.animation);
	}

	countAnimation() {
		if (this.animation == "count") {
			this.animation = "none";
		} else {
			this.animation = "count";
		}
		this.animation_changed.emit(this.animation);
	}	

}
