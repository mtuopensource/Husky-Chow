import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyPage } from '../daily/daily';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-daily',
  templateUrl: '../daily/daily.html'
})

/**
 * TomorrowPage
 * An extension of DailyPage, which shows tomorrow's menu.
 */
export class TomorrowPage extends DailyPage {

  /**
   * TomorrowPage Constructor
   * NOTE the properties on the constructor must be public, since we're overriding.
   * @param  {NavController} navCtrl   Used to navigate to pages. A stack of pages representing history.
   * @param  {NgZone}        zone      Injectable service for executing code inside or outside of the Angular zone.
   * @param  {NavParams}     navParams An object that exists on a page and can contain data for that particular view.
   */
  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams) {
    super(navCtrl, zone, navParams);
    this.name = "Tomorrow's Menu";
  }

  /**
   * Ahead
   * @return {Number} representing the number of days to look ahead.
   */
  ahead = (): number => {
    return 1;
  }
}
