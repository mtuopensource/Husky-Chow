import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { DailyPage } from '../pages/daily/daily';
import { TomorrowPage } from '../pages/tomorrow/tomorrow';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarPage } from '../pages/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    DailyPage,
    TomorrowPage,
    SuggestionsPage,
    TabsPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      platforms: {
        ios: {
          tabsPlacement: 'bottom',
        }
      }
    }
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    DailyPage,
    SuggestionsPage,
    TabsPage,
    TomorrowPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
