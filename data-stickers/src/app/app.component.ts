import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { SettingsPage } from './modals/settings/settings.page';

import { AnalyticsService } from './analytics.service';
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private settingsPage: SettingsPage,
    private analyticsService: AnalyticsService,
    private health: Health
  ) {
    this.initializeApp();
    this.settingsPage = new SettingsPage(modalController, toastController, navCtrl, analyticsService, storage, health);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // this.analyticsService.setUser();
  }
}
