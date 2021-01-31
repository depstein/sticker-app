import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from "./../global-data.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as moment from 'moment';
import { StickerInfo } from '../sticker-info-class';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements AfterViewInit {
	
	@ViewChild('sticker', {static:true}) stickerElement:ElementRef;
  @Input() stickerInfo:StickerInfo;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer, private global:GlobalDataService) { }

  ngAfterViewInit() {
  	this.http.get(this.stickerInfo.config.svgURL, {responseType: 'text'}).subscribe(svg => {
  		this.stickerElement.nativeElement.innerHTML = svg;
  		this.rerender();
  	});
  }

  rerender(){
    this.colorSticker();
    this.updateText();
    this.wrapText();
    this.animate();
  }

  colorSticker() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      this.stickerInfo.config.color(this.stickerElement, this.stickerInfo.color);
    }
  }

  updateText() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      var options = {value:this.stickerInfo.value, unit:this.stickerInfo.unit, domain:this.stickerInfo.domain};
      this.stickerInfo.config.updateText(this.stickerElement, options);
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
      finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0] + ", " + topTwoUnits[1][1] + " " + topTwoUnits[1][0];
    }
    else if(topTwoUnits.length > 0) {
      finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0];
    } else {
      finalValue = "0 sec";
    }
    
    return finalValue;
  }

  wrapText() {
    if (this.stickerInfo.domain == "time")
    {
      var text = this.stickerElement.nativeElement.querySelector("#text");
      if(text) {
        text.textContent = this.processDefaultTimeText(this.stickerInfo.value);
      }
      if (this.stickerInfo.config.stickerType === 'chartjunk') 
      {
        var goalQ = this.stickerElement.nativeElement.querySelector("#goal");
        if(goalQ) {
          goalQ.textContent = this.processDefaultTimeText(this.stickerInfo.goal);
        }
        try {
          var midpoint = this.stickerElement.nativeElement.querySelector("#midpoint");
          if(midpoint) {
            midpoint.textContent = this.processDefaultTimeText(this.stickerInfo.goal / 2);
          }
        } catch (error) {}
      }
    }
    else 
    {
      var text = this.stickerElement.nativeElement.querySelector("#text");
      if(text) {
        text.textContent = this.stickerInfo.value + " " + this.stickerInfo.unit;
      }
      if (this.stickerInfo.config.stickerType === 'chartjunk') 
      {
        var goalQ = this.stickerElement.nativeElement.querySelector("#goal");
        if(goalQ) {
          goalQ.textContent = this.stickerInfo.goal;
        }
        try {
          var midpoint = this.stickerElement.nativeElement.querySelector("#midpoint");
          if(midpoint) {
            midpoint.textContent = this.stickerInfo.goal / 2;
          }
        } catch (error) {}
      }
    }


    if (this.stickerInfo.config.stickerType === 'analogy') 
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

  animate() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      var options = {}
      if(this.stickerInfo.hasGoal) {
        //Maxing this out at 100 so the bar fills up, but this might not be what we want to happen.
        options['percent'] = Math.min(100, Math.floor(this.stickerInfo.value/this.stickerInfo.goal*100));
      }
      options['value'] = this.stickerInfo.value;
      this.stickerInfo.config.animate(this.stickerElement, this.stickerInfo.animation, options);
    }    
  }
}
