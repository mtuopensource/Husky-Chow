import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HuskyChow } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { DailyPage } from '../pages/daily/daily';
import { TomorrowPage } from '../pages/tomorrow/tomorrow';
import { CalendarPage } from '../pages/calendar/calendar';

@NgModule({
  declarations: [ HuskyChow, AboutPage, DailyPage, SuggestionsPage, TabsPage, TomorrowPage, CalendarPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HuskyChow, {
      tabsPlacement: 'top',
      platforms: {
        ios: {
          tabsPlacement: 'bottom',
        }
      }
    })],
  bootstrap: [IonicApp],
  entryComponents: [ HuskyChow, AboutPage, DailyPage, SuggestionsPage, TabsPage, TomorrowPage, CalendarPage ],
  providers: [
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule {}
