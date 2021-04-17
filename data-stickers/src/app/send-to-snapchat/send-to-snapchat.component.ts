import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-to-snapchat',
  templateUrl: './send-to-snapchat.component.html',
  styleUrls: ['./send-to-snapchat.component.scss'],
})
export class SendToSnapchatComponent implements OnInit {
	@Input() sticker:string;
  private base_url:string = "https://sheltered-waters-08469.herokuapp.com";
  // private base_url:string = "http://localhost:5000";

  constructor() { 
	}

  ngOnInit() {
    //This may not work if you have an adblocker running.
  	var js, sjs = document.getElementsByTagName('script')[0];
		var tag = document.getElementById('snapkit-creative-kit-sdk');
  	if (tag) {
			//This is a hack. The library alters the tags when it's loaded to redirect to Snapchat,
      //So this can be triggered by removing and reloading the library. Unsure whether it can get triggered manually.
      tag.parentNode.removeChild(tag);
      sjs = document.getElementsByTagName('script')[0];
		}
  	js = document.createElement('script'); 
    js.id = 'snapkit-creative-kit-sdk';
  	js.src = "https://sdk.snapkit.com/js/v1/create.js";
  	sjs.parentNode.insertBefore(js, sjs);
  }

  get URL():string {
    var args = this.sticker.substring(this.base_url.length);
    console.log("args: " + args);
    //console.log(this.base_url + "/sticker?sticker=" + encodeURIComponent(this.sticker));
    // return this.base_url + '/' + this.sticker;
    // return this.sticker;
    // return "https://denniswang.info/assets/images/test-sticker.png";
    console.log("send to snapchat: " + this.base_url + "/sticker" + args);
    return this.base_url + "/sticker" + args;
  }

}
