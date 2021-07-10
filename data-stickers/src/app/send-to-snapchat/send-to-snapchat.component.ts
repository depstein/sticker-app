import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../environments/environment';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-send-to-snapchat',
  templateUrl: './send-to-snapchat.component.html',
  styleUrls: ['./send-to-snapchat.component.scss'],
})
export class SendToSnapchatComponent implements OnInit {
	@Input() sticker:string;

  constructor(private analyticsService: AnalyticsService) {
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
    var args = this.sticker.substring(environment.serverURL.length);
    console.log("args: " + args);
    //console.log(environment.serverURL + "/sticker?sticker=" + encodeURIComponent(this.sticker));
    // return environment.serverURL + '/' + this.sticker;
    // return this.sticker;
    // return "https://denniswang.info/assets/images/test-sticker.png";
    console.log("send to snapchat: " + environment.serverURL + "/sticker" + args);
    return environment.serverURL + "/sticker" + args;
  }

}
