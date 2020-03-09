import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {
    noAnimationSelected: boolean;
    pulseAnimationSelected: boolean;
    shakeAnimationSelected: boolean;
    fillAnimationSelected: boolean;
    countAnimationSelected: boolean;

    constructor() {
        this.noAnimationSelected = true;
        this.pulseAnimationSelected = false;
        this.shakeAnimationSelected = false;
        this.fillAnimationSelected = false;
        this.countAnimationSelected = false;
    }

  ngOnInit() {}

    noAnimation() {
        if (!this.noAnimationSelected) {
            var elements = document.getElementsByClassName("selected");
            while (elements.length > 0) {
                elements[0].classList.remove("selected");
            }
            document.getElementById('noAnimation').classList.add("selected");
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
            this.noAnimationSelected = true;
            document.getElementById('pulseAnimation').classList.remove("selected");
            document.getElementById('noAnimation').classList.add("selected");      
        } else {
            var elements = document.getElementsByClassName("selected");
            while (elements.length > 0) {
                elements[0].classList.remove("selected");
            }
            document.getElementById('pulseAnimation').classList.add("selected");
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
            this.noAnimationSelected = true;
            document.getElementById('shakeAnimation').classList.remove("selected");
            document.getElementById('noAnimation').classList.add("selected");
        } else {
            var elements = document.getElementsByClassName("selected");
            while (elements.length > 0) {
                elements[0].classList.remove("selected");
            }
            document.getElementById('shakeAnimation').classList.add("selected");
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
            this.noAnimationSelected = true;
            document.getElementById('fillAnimation').classList.remove("selected");
            document.getElementById('noAnimation').classList.add("selected");
        } else {
            var elements = document.getElementsByClassName("selected");
            while (elements.length > 0) {
                elements[0].classList.remove("selected");
            }
            document.getElementById('fillAnimation').classList.add("selected");
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
            this.noAnimationSelected = true;
            document.getElementById('countAnimation').classList.remove("selected");
            document.getElementById('noAnimation').classList.add("selected");
        } else {
            var elements = document.getElementsByClassName("selected");
            while (elements.length > 0) {
                elements[0].classList.remove("selected");
            }
            document.getElementById('countAnimation').classList.add("selected");
            this.countAnimationSelected = true;
            this.noAnimationSelected = false;
            this.pulseAnimationSelected = false;
            this.shakeAnimationSelected = false;
            this.fillAnimationSelected = false;
        }
    }	

}
