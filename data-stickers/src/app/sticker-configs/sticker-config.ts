import {ElementRef} from '@angular/core';
import * as moment from 'moment';

export abstract class StickerConfig {
	imageURL: string;
	svgURL: string;
	stickerType: string;
	stickerRelevance: string;
  variation: number = 1;
  colorMap:{};
  color: string;
  domain: string;
  value: number = 0;
  unit: string;
  animation: string;
  canAddGoal:boolean = false;
  hasGoal: boolean;
  goal: number;
  min:number = 0;
  hour:number = 0;
  goal_min:number;
  goal_hour:number;

	constructor(imageURL, svgURL) {
		this.imageURL = imageURL;
		this.svgURL = svgURL;
		this.stickerType = "";
		this.stickerRelevance = "";
    this.colorMap = undefined;
	}

	colorSticker(el:ElementRef, color:string) {
    //By default, coloring does nothing because most stickers are not colorable.
	}

  updateText(el:ElementRef, options:{}=undefined) {
    //By default, there's no text to update. Only analogies need text updating
  }

	animate(el:ElementRef, animation:string, options:{}=undefined) {
		// Getting the svg element from the html page to be animated
		var svg = el.nativeElement.querySelector("svg");

		// Select type of animation based on the value of the "animation" query parameter
		// options = [pulse, shake, count]
		var gsap_animation = this.animation_options(el, svg, animation, options);
    if(gsap_animation) {
      gsap_animation.play();
    }
	}

  toggleGoal() {
    //By default, a goal can't be toggled. Only hybrid stickers can have a goal added/removed
  }

  wrapText(el, options) {
    this.updateText(el, options);
    if (options['domain'] == "time")
    {
      var text = el.nativeElement.querySelector("#text");
      if(text) {
        text.textContent = this.processDefaultTimeText(options['value']);
      }
      if (this.stickerType === 'chartjunk') 
      {
        var goalQ = el.nativeElement.querySelector("#goal");
        if(goalQ) {
          goalQ.textContent = this.processDefaultTimeText(options['goal']);
        }
        try {
          var midpoint = el.nativeElement.querySelector("#midpoint");
          if(midpoint) {
            midpoint.textContent = this.processDefaultTimeText(options['goal'] / 2);
          }
        } catch (error) {}
      }
    }
    else 
    {
      var text = el.nativeElement.querySelector("#text");
      if(text) {
        text.textContent = options['value'] + " " + options['unit'];
      }
      if (this.stickerType === 'chartjunk') 
      {
        var goalQ = el.nativeElement.querySelector("#goal");
        if(goalQ) {
          goalQ.textContent = options['goal'];
        }
        try {
          var midpoint = el.nativeElement.querySelector("#midpoint");
          if(midpoint) {
            midpoint.textContent = options['goal'] / 2;
          }
        } catch (error) {}
      }
    }


    if (this.stickerType === 'analogy') 
    {
      // @ts-ignore
      d3plus
        .textwrap()
        // @ts-ignore
        .container(d3.select("#text"))
        .resize(false)
        .valign("middle") 
        .draw();

      // @ts-ignore
      d3plus
        .textwrap()
        // @ts-ignore
        .container(d3.select("#analogy"))
        .resize(true)
        .draw();
    }
    else {
      // @ts-ignore
      d3plus
      .textwrap()
      // @ts-ignore
      .container(d3.select("#text"))
      .resize(false)
      .align("center")
      .valign("middle")   
      .draw();
    }
  }

  processDefaultTimeText(ms) {
    var parseDuration = moment.duration(ms);
    var orderOfDuration = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
    var durationAbbr = {
      "years": "year", 
      "months": "month",
      "days": "day", 
      "hours": "hour", 
      "minutes": "min", 
      "seconds": "sec", 
      "milliseconds": "ms"
    }
    var topTwoUnits = [];
    var finalValue = "";

    for (var i = 0; i < orderOfDuration.length; i++) {
    if (parseDuration["_data"][orderOfDuration[i]] !== 0){
        var unit = ((parseDuration["_data"][orderOfDuration[i]] > 1) ? durationAbbr[orderOfDuration[i]] + "s" : durationAbbr[orderOfDuration[i]]);
        topTwoUnits.push([unit, parseDuration["_data"][orderOfDuration[i]]])
        if(topTwoUnits.length === 2) {
        break;
        }
    }
    } 
    if (topTwoUnits.length > 1) {
      finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0] + ", " + Math.floor(topTwoUnits[1][1]) + " " + topTwoUnits[1][0];
    }
    else if(topTwoUnits.length > 0) {
      finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0];
    } else {
      finalValue = "0 sec";
    }
    
    return finalValue;
  }

	animation_options(el, svg, param, options) {
    var Cont={val:0} , NewVal = options['value'];

    switch (param) {
      case "pulse":
      // @ts-ignore
        return TweenMax.fromTo(svg, 0.8, {
          scaleX: 1.05,
          scaleY: 1.15
        },{
          scaleX: 1,
          scaleY: 1,
          // @ts-ignore
          ease: Elastic.easeOut
        });

      case "shake":
      // @ts-ignore
        return TweenLite.fromTo(svg, 1,{ 
            rotation: -10 
          },
          { 
            rotation: 0, 
            // @ts-ignore
            ease: Elastic.easeOut.config(2, 0.2) 
      });

      case "count":
        // @ts-ignore
        return TweenLite.to(Cont , 1, {
            val: NewVal, 
            roundProps: "val", 
            onUpdate: ()=>{
                options['value'] = Cont.val;
                this.wrapText(el, options);
            }
        });
    }
    return undefined;
  }
}
