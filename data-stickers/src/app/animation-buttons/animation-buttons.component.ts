import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-buttons',
  templateUrl: './animation-buttons.component.html',
  styleUrls: ['./animation-buttons.component.scss'],
})
export class AnimationButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
	
	pulseAnimation() {}
	shakeAnmiation() {}
	fillAnimation() {}
	countAnimation() {}	

}
