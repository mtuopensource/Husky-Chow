import { Component } from '@angular/core';
import { DailyPage } from '../daily/daily';
import { TomorrowPage } from '../tomorrow/tomorrow';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})

/**
 * TabsPage
 * The view controller for the tabs shown at the bottom of menu pages. Includes
 * daily, tomorrow, and calendar pages.
 */
export class TabsPage {
  private tab1Root = DailyPage;
  private tab2Root = TomorrowPage;
  private tab3Root = CalendarPage;

  /**
   * TabsPage Constructor
   */
  constructor() {
  }
}
