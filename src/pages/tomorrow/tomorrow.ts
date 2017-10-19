import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyPage } from '../daily/daily';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-daily',
  templateUrl: '../daily/daily.html'
})

export class TomorrowPage extends DailyPage {
  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams) {
    super(navCtrl, zone, navParams);
    this.name = "Tomorrow's Menu";
  }

  ahead = (): number => {
    return 1;
  }
}
