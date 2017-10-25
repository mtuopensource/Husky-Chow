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
 * A new instance of this class is created when the app is launched.
 */
export class HuskyChow {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = TabsPage;

  /**
   * HuskyChow Constructor
   * When the platform is ready, sets the default style of the status bar and hides the splash screen.
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
   * Clears the navigation stack and pushes a new instance of AboutPage.
   * @param  {NavParams} params an object that exists on a page and can contain data for that particular view.
   */
  goToAbout = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(AboutPage);
  }

  /**
   * GoToSuggestions
   * Clears the navigation stack and pushes a new instance of SuggestionsPage.
   * @param  {NavParams} params an object that exists on a page and can contain data for that particular view.
   */
  goToSuggestions = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(SuggestionsPage);
  }

  /**
   * GoToTabs
   * Clears the navigation stack and pushes a new instance of TabsPage.
   * @param  {NavParams} params an object that exists on a page and can contain data for that particular view.
   */
  goToTabs = (params): void => {
    if (!params) {
      params = {};
    }
    this.navCtrl.setRoot(TabsPage);
  }
}
