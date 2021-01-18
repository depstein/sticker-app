import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
 
// Init for the web
import "@capacitor-community/firebase-analytics";
 
import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics, Device } = Plugins;
 
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;
 
  constructor( private router: Router) {
    this.initFb();
    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
    ).subscribe((e: RouterEvent) => {
      console.log('route changed: ', e.url);
      this.setScreenName(e.url)
    });
  }
 
  async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }
 
  setUser() {
    // Use Firebase Auth uid
    FirebaseAnalytics.setUserId({
      userId: "test_123",
    });
  }
 
  setProperty() {
    FirebaseAnalytics.setUserProperty({
      name: "framework",
      value: "angular",
    });
  }
 
  colorButtonEvent(colorClicked) {
    console.log("color-clicked: "+colorClicked);
    FirebaseAnalytics.logEvent({
      name: "color button clicked",
      params: {
        // method: "email",
        userEvent: colorClicked,
        time: Date.now()
      }
    });
  }

  animationButtonEvent(animationClicked) {
    console.log("color-clicked: "+animationClicked);
    FirebaseAnalytics.logEvent({
      name: "animation button clicked",
      params: {
        // method: "email",
        userEvent: animationClicked,
        time: Date.now()
      }
    });
  }
 
  setScreenName(screenName) {
    FirebaseAnalytics.setScreenName({
      screenName
    });
  }
 
  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });    
  }
  
}