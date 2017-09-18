import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { DailyPage } from '../pages/daily/daily';
import { WeeklyPage } from '../pages/weekly/weekly';
import { MonthlyPage } from '../pages/monthly/monthly';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    DailyPage,
    WeeklyPage,
    MonthlyPage,
    SuggestionsPage,
    TabsPage
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
    WeeklyPage,
    MonthlyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
