import { Component } from '@angular/core';

import { DailyPage } from '../daily/daily';
import { TomorrowPage } from '../tomorrow/tomorrow';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DailyPage;
  tab2Root = TomorrowPage;
  tab3Root = CalendarPage;
  constructor() {

  }
}
