import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Environment } from '../../config/environment';
import * as moment from "moment";
declare var gapi: any;

@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html'
})

export class DailyPage {
  public refresher: any;
  public days: any = [];
  public keys: any = [];
  public none: any;
  public name: any;

  /**
  * DailyPage
  * @param {NavController} publicnavCtrl
  * @param {NgZone}        publiczone
  */
  constructor(public navCtrl: NavController, public zone: NgZone) {
    this.name = "Today's Menu";
    this.loadGapi();
  }

  /**
  * Ahead
  * @return the number of days to look ahead.
  */
  ahead = (): number => {
    return 1;
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
        this.none = true;
        this.days = [];
        this.keys = [];
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
      gapi.client.init(options).then(this.loadGapiCalendarApi);
    } else {
      console.error('Gapi client library not loaded');
      this.zone.run(() => {
        this.none = true;
        this.days = [];
        this.keys = [];
      });
    }
  }

  /**
  * LoadGapiCalendarApi
  * Asynchronously loads the Google Calendar library. On success, we then request
  * the events list from the calendar id set in the Environment.
  */
  loadGapiCalendarApi = (): void => {
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
    minTime.setHours(0, 0, 0, 0); /* Last Midnight */
    maxTime.setHours(24 * this.ahead(), 0, 0, 0); /* Add 24 hours for each day */
    var parameters = { 'calendarId': Environment.GAPI_CALENDAR_ID, 'timeMin': minTime.toISOString(), 'timeMax': maxTime.toISOString(), 'singleEvents': true, 'orderBy': 'startTime' };
    gapi.client.calendar.events.list(parameters).then(this.parseEventsList);
  }

  /**
  * ParseEventsList
  * Adds each meal to the list, using the title, date and time, and description
  * given by the event list request.
  * @param {String} response from the events list request.
  */
  parseEventsList = (response): void => {
    var events = response.result.items;
    if (events.length > 0) {
      for (let event of events) {
        var time = moment(event.start.dateTime).format('h:mm a');
        var date = moment(event.start.dateTime).format('dddd, MMMM DD');
        if (event.description) {
          var items = event.description.split(',');
          var title = event.summary.toLowerCase();
          if (title.includes('breakfast')) {
            title = "Breakfast";
          } else if (title.includes("brunch")) {
            title = "Brunch";
          } else if (title.includes("dinner")) {
            title = "Dinner";
          } else if (title.includes('supper')) {
            title = "Dinner";
          } else if (title.includes('lunch')) {
            title = "Lunch";
          } else {
            console.log(event.summary + ' is not a meal, skipping.');
            continue;
          }
          var key = this.days.find(x => x.date == date);
          if(!key) {
            key = { 'date': date, 'meals': [] }
            this.days.push(key);
          }
          var structure = { 'title': title, 'items': items, 'time': time };
          this.zone.run(() => {
            key.meals.push(structure);
            this.keys = Object.keys(this.days);
            this.none = false;
          });
          if (this.refresher) {
            this.refresher.complete();
          }
        } else {
          console.log(event.summary + ' has no description, skipping.');
          continue;
        }
      }
    } else {
      console.log('No response, clearing old items');
      this.zone.run(() => {
        this.none = true;
        this.days = [];
        this.keys = [];
      });
    }
  }

  /**
  * DoRefresh
  * Called when the user has requested a refresh.
  * @param refresher provides pull-to-refresh functionality on a content component.
  */
  doRefresh = (refresher): void => {
    this.refresher = refresher;
    this.loadGapi();
  }
}
