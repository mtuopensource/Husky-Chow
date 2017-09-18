import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyPage } from '../daily/daily';

@Component({
  selector: 'page-daily',
  templateUrl: '../daily/daily.html'
})

export class WeeklyPage extends DailyPage {
  constructor(public navCtrl: NavController, public zone: NgZone) {
    super(navCtrl, zone);
    this.name = "This Week's Menu";
  }

  ahead = (): number => {
    return 7;
  }
}
