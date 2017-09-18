import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from '../pages/about/about';
import { DailyPage } from '../pages/daily/daily';
import { WeeklyPage } from '../pages/weekly/weekly';
import { MonthlyPage } from '../pages/monthly/monthly';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToAbout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AboutPage);
  }goToSuggestions(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SuggestionsPage);
  }goToTabs(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsPage);
  }
}
