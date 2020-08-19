import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalDataService } from "./global-data.service";

import { File } from "@ionic-native/file/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../app/modals/modal/modal.page'
import { SelectunitPage} from '../app/modals/selectunit/selectunit.page';

@NgModule({
  declarations: [AppComponent,ModalPage,SelectunitPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalDataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    SocialSharing,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalPage,SelectunitPage]
})
export class AppModule {}
