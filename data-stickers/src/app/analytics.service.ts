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
      this.setScreenName(e.url);
    });
  }
 
  async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  animationButtonEvent(animationClicked) {
    console.log("animation clicked: "+animationClicked);
    FirebaseAnalytics.logEvent({
      name: "animation button clicked",
      params: {
        // method: "email",
        userEvent: animationClicked,
        time: Date.now()
      }
    });
  }
 
  colorButtonEvent(colorClicked) {
    console.log("color clicked: "+colorClicked);
    FirebaseAnalytics.logEvent({
      name: "color button clicked",
      params: {
        // method: "email",
        userEvent: colorClicked,
        time: Date.now()
      }
    });
  }

  domainButtonEvent(domainClicked) {
    console.log("domain clicked: "+domainClicked);
    FirebaseAnalytics.logEvent({
      name: "domain clicked",
      params: {
        // method: "email",
        userEvent: domainClicked,
        time: Date.now()
      }
    });
  }

  recentStickerButtonEvent(stickerClicked, currentDomain) {
    console.log("recent sticker clicked: "+stickerClicked);
    FirebaseAnalytics.logEvent({
      name: "recent sticker clicked",
      params: {
        // method: "email",
        userEvent: stickerClicked + " - " + currentDomain,
        time: Date.now()
      }
    });
  }

  stickerButtonEvent(stickerClicked, currentDomain) {
    console.log("sticker clicked: "+stickerClicked);
    FirebaseAnalytics.logEvent({
      name: "sticker clicked",
      params: {
        // method: "email",
        userEvent: stickerClicked + " - " + currentDomain,
        time: Date.now()
      }
    });
  }
 
  setUser(userId) {
    // Use Firebase Auth uid
    console.log(userId);
    FirebaseAnalytics.setUserId({
      userId: userId,
    });
  }
 
  setProperty() {
    FirebaseAnalytics.setUserProperty({
      name: "framework",
      value: "angular",
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