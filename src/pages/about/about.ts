import { Component }     from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector:    'page-about',
  templateUrl: 'about.html'
})

/**
 * AboutPage
 */
export class AboutPage {

  /**
   * AboutPage Constructor
   * @param  {NavController} navCtrl Used to navigate to pages. A stack of pages representing history.
   */
  constructor(public navCtrl: NavController) {
  }
}
