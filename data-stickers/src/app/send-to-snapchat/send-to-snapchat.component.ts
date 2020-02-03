import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-to-snapchat',
  templateUrl: './send-to-snapchat.component.html',
  styleUrls: ['./send-to-snapchat.component.scss'],
})
export class SendToSnapchatComponent implements OnInit {
	@Input() sticker:string;
  private base_url:string = "http://sheltered-waters-08469.herokuapp.com";

  constructor() { 
	}

  ngOnInit() {
    //This may not work if you have an adblocker running.
  	var js, sjs = document.getElementsByTagName('script')[0];
  	if (document.getElementById('snapkit-creative-kit-sdk')) return;
  	js = document.createElement('script'); js.id = 'snapkit-creative-kit-sdk';
  	js.src = "https://sdk.snapkit.com/js/v1/create.js";
  	sjs.parentNode.insertBefore(js, sjs);
  }
	
	get URL():string {
    return this.base_url + '/' + this.sticker;
  }

}
