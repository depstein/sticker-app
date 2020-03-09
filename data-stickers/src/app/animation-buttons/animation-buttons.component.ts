import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {
    animations = [];
    noAnimationSelected: boolean;
    pulseAnimationSelected: boolean;
    shakeAnimationSelected: boolean;
    fillAnimationSelected: boolean;
    countAnimationSelected: boolean;

    constructor() {
        this.noAnimationSelected = false;
        this.pulseAnimationSelected = false;
        this.shakeAnimationSelected = false;
        this.fillAnimationSelected = false;
        this.countAnimationSelected = false;
    }

  ngOnInit() {}

    noAnimation() {
        if (this.noAnimationSelected) {
            this.noAnimationSelected = false;
        } else {
            $(".selected").removeClass(".selected");
            document.getElementById('noAnimation').classList.add(".selected");
            this.noAnimationSelected = true;
            this.pulseAnimationSelected = false;
            this.shakeAnimationSelected = false;
            this.fillAnimationSelected = false;
            this.countAnimationSelected = false;

        }
    }

    pulseAnimation() {
        if (this.pulseAnimationSelected) {
            this.pulseAnimationSelected = false;
        } else {
            $(".selected").removeClass(".selected");
            document.getElementById('pulseAnimation').classList.add(".selected");
            this.pulseAnimationSelected = true;
            this.noAnimationSelected = false;
            this.shakeAnimationSelected = false;
            this.fillAnimationSelected = false;
            this.countAnimationSelected = false;
        }
    }
    shakeAnimation() {
        if (this.shakeAnimationSelected) {
            this.shakeAnimationSelected = false;
        } else {
            $(".selected").removeClass(".selected");
            document.getElementById('shakeAnimation').classList.add(".selected");
            this.shakeAnimationSelected = true;
            this.noAnimationSelected = false;
            this.pulseAnimationSelected = false;
            this.fillAnimationSelected = false;
            this.countAnimationSelected = false;
        }
    }
    fillAnimation() {
        if (this.fillAnimationSelected) {
            this.fillAnimationSelected = false;
        } else {
            $(".selected").removeClass(".selected");
            document.getElementById('fillAnimation').classList.add(".selected");
            this.fillAnimationSelected = true;
            this.noAnimationSelected = false;
            this.pulseAnimationSelected = false;
            this.shakeAnimationSelected = false;
            this.countAnimationSelected = false;
        }
    }
    countAnimation() {
        if (this.countAnimationSelected) {
            this.countAnimationSelected = false;
        } else {
            $(".selected").removeClass(".selected");
            document.getElementById('countAnimation').classList.add(".selected");
            this.countAnimationSelected = true;
            this.noAnimationSelected = false;
            this.pulseAnimationSelected = false;
            this.shakeAnimationSelected = false;
            this.fillAnimationSelected = false;
        }
    }	

}
