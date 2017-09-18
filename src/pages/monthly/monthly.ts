import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyPage } from '../daily/daily';

@Component({
  selector: 'page-daily',
  templateUrl: '../daily/daily.html'
})

export class MonthlyPage extends DailyPage {
  constructor(public navCtrl: NavController, public zone: NgZone) {
    super(navCtrl, zone);
    this.name = "This Month's Menu";
  }

  ahead = (): number => {
    return 31;
  }
}
