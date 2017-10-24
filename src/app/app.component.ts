import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { SuggestionsPage } from '../pages/suggestions/suggestions';

@Component({
  templateUrl: 'app.html'
})

/**
 * HuskyChow App
 * The entry point for the app. When the platform is ready, sets the default
 * style of the status bar and hides the splash screen.
 */
export class HuskyChow {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = TabsPage;

  /**
   * HuskyChow Constructor
   * @param  {Platform}     platform     Used to get information about your current device.
   * @param  {StatusBar}    statusBar    Manage the appearance of the native status bar.
   * @param  {SplashScreen} splashScreen Displays and hides a splash screen during application launch.
   */
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      /**
       * Called when the platform is ready and our plugins are available. Here,
       * you can do any higher level native things you might need.
       */
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * GoToAbout
   * @param  {[type]} params an object that exists on a page and can contain data for that particular view.
   */
  goToAbout = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(AboutPage);
  }

  /**
   * GoToSuggestions
   * @param  {[type]} params an object that exists on a page and can contain data for that particular view.
   */
  goToSuggestions = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(SuggestionsPage);
  }

  /**
   * GoToTabs
   * @param  {[type]} params an object that exists on a page and can contain data for that particular view.
   */
  goToTabs = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(TabsPage);
  }
}
