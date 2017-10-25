import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Environment } from '../../config/environment';
import { NavParams } from 'ionic-angular';
import * as moment from "moment";

declare var gapi: any; // TypeScript doesn't know this exists.

@Component({
  selector:    'page-daily',
  templateUrl: 'daily.html'
})

/**
 * DailyPage
 * Displays planned meals for a particular date. By default, this is the current
 * date. The user can choose another date using the Calendar view.
 */
export class DailyPage {
  private userAhead: number;
  private refresher: any;
  private days: any = [];
  protected pageTitle: string; // The page title, displayed in the navigation bar.
  protected readonly mealTypes: any = {
    'breakfast': 'Breakfast',
    'brunch'   : 'Brunch',
    'lunch'    : 'Lunch',
    'dinner'   : 'Dinner',
    'supper'   : 'Dinner'
  };

  /**
   * DailyPage Constructor
   * NOTE the properties on the constructor must be public, since we're overriding.
   * @param  {NavController} navCtrl   Used to navigate to pages. A stack of pages representing history.
   * @param  {NgZone}        zone      Injectable service for executing code inside or outside of the Angular zone.
   * @param  {NavParams}     navParams An object that exists on a page and can contain data for that particular view.
   */
  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams) {
    this.userAhead = navParams.get('ahead');
    this.pageTitle = this.getPageTitle();
    this.loadGapi();
  }

  /**
   * Ahead
   * @return {Number} representing the number of days to look ahead.
   */
  ahead = (): number => {
    return 0;
  }

  /**
   * GetPageTitle
   * Returns the navigation bar title, depending on if the user has selected a
   * custom date or not.
   * @return {string} title
   */
  getPageTitle = (): string => {
    var date = new Date();
    if(this.userAhead) {
      date.setHours(this.userAhead * 24, 0, 0, 0);
      return moment(date.toISOString()).format('dddd, MMMM Do'); //TODO Inefficient way to convert a JS Date to Moment.
    } else {
      return 'Today\'s Menu';
    }
  }

  /**
  * Clear
  * Clears any data that was previously fetched by the Google Api.
  */
  clear = (): void => {
    this.days = [];
  }

  /**
   * LoadGapi
   * Asynchronously loads the Google API client library. On success, we then
   * attempt to autenticate using the key and discovery documents set in
   * the Environment.
   */
  loadGapi = (): void => {
    if (gapi) {
      gapi.load('client:auth2', this.authGapi);
    } else {
      console.error('Gapi not loaded');
      this.zone.run(() => {
        this.clear();
      });
    }
  }

  /**
   * AuthGapi
   * Asynchronously authenticates with the Google API using the key and discovery
   * documents set in the Environment. On success, we then attempt to load the
   * Google Calendar API.
   */
  authGapi = (): void => {
    if (gapi) {
      var options = { 'apiKey': Environment.GAPI_API_KEY, 'discoveryDocs': Environment.GAPI_DISCOVERY_DOCS };
      gapi.client.init(options).then(this.loadCalendarApi);
    } else {
      console.error('Gapi client library not loaded');
      this.zone.run(() => {
        this.clear();
      });
    }
  }

  /**
   * LoadCalendarApi
   * Asynchronously loads the Google Calendar library. On success, we then request
   * the events list from the calendar id set in the Environment.
   */
  loadCalendarApi = (): void => {
    gapi.client.load('calendar', 'v3').then(this.requestEventsList);
  }

  /**
   * RequestEventsList
   * Asynchronously requests the Events List from the Google Calendar Library. On
   * success, we then parse the events list.
   */
  requestEventsList = (): void => {
    var minTime = new Date();
    var maxTime = new Date();
    if(this.userAhead) {
      minTime.setHours(24 * this.userAhead, 0, 0, 0); /* Previous Midnight */
      maxTime.setHours(24 * this.userAhead + 24, 0, 0, 0); /* Next Midnight */
    } else {
      minTime.setHours(24 * this.ahead(), 0, 0, 0); /* Previous Midnight */
      maxTime.setHours(24 * this.ahead() + 24, 0, 0, 0); /* Next Midnight */
    }
    var parameters = {
      'calendarId': Environment.GAPI_CALENDAR_ID,
      'timeMin': minTime.toISOString(),
      'timeMax': maxTime.toISOString(),
      'singleEvents': true,
      'orderBy': 'startTime'
    };
    gapi.client.calendar.events.list(parameters).then(this.parseEventsList);
  }

  /**
   * ParseEventsList
   * Adds each meal to the list, using the title, date and time, and description
   * given by the event list request.
   * @param {Array} response from the events list request.
   */
  parseEventsList = (response): void => {
    var events = response.result.items;
    this.zone.run(() => {
      this.clear(); // Prevent duplicate data from being displayed.
    });
    for (let event of events) {
      var time = moment(event.start.dateTime).format('h:mm a');
      var date = moment(event.start.dateTime).format('dddd, MMMM Do');
      if (event.description) {
        var keyvp = this.days.find(day => day.date == date);
        var items = event.description.split(','); // Comma seperated list of foodstuffs.
        var title = event.summary.toLowerCase();
        if(title in this.mealTypes) {
          title = this.mealTypes[title];
          if(!keyvp) {
            keyvp = { 'date': date, 'meals': [] };
            this.days.push(keyvp);
          }
          var meal = { 'title': title, 'items': items, 'time': time };
          this.zone.run(() => {
            keyvp.meals.push(meal);
          });
          if (this.refresher) {
            this.refresher.complete();
          }
        } else {
          console.log(event.summary + ' has unknown meal type, skipping.');
          continue; // TODO Report this to the devs to correct.
        }
      } else {
        console.log(event.summary + ' has no description, skipping.');
        continue;
      }
    }
  }

  /**
   * DoRefresh
   * Called when the user has requested a refresh.
   * @param {Refresher} refresher provides pull-to-refresh functionality on a content component.
   */
  doRefresh = (refresher): void => {
    this.refresher = refresher;
    this.loadGapi();
  }
}
