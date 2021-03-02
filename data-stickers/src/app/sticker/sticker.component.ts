import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from "./../global-data.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as moment from 'moment';
import { StickerConfig } from '../sticker-configs/sticker-config';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements AfterViewInit {
	
	@ViewChild('sticker', {static:true}) stickerElement:ElementRef;
  @Input() stickerInfo:StickerConfig;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer, private global:GlobalDataService) { }

  ngAfterViewInit() {
  	this.http.get(this.stickerInfo.svgURL, {responseType: 'text'}).subscribe(svg => {
  		this.stickerElement.nativeElement.innerHTML = svg;
  		this.rerender();
  	});
  }

  rerender(){
    this.colorSticker();
    this.animate();
    this.wrapText();
  }

  colorSticker() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      this.stickerInfo.colorSticker(this.stickerElement, this.stickerInfo.color);
    }
  }

  wrapText() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      var options = {};
      options['value'] = this.stickerInfo.value;
      options['domain'] = this.stickerInfo.domain;
      options['goal'] = this.stickerInfo.goal;
      options['unit'] = this.stickerInfo.unit;
      this.stickerInfo.wrapText(this.stickerElement, options);
    }
  }

  animate() {
    if(this.stickerElement && this.stickerElement.nativeElement) {
      var options = {};
      options['value'] = this.stickerInfo.value;
      options['domain'] = this.stickerInfo.domain;
      options['goal'] = this.stickerInfo.goal;
      options['unit'] = this.stickerInfo.unit;
      this.stickerInfo.animate(this.stickerElement, this.stickerInfo.animation, options);
    }    
  }
}
