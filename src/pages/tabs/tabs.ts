import { Component } from '@angular/core';

import { DailyPage } from '../daily/daily';
import { WeeklyPage } from '../weekly/weekly';
import { MonthlyPage } from '../monthly/monthly';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DailyPage;
  tab2Root = WeeklyPage;
  tab3Root = MonthlyPage;

  constructor() {

  }
}
