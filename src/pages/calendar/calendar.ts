import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyPage } from '../daily/daily';
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector:    'page-calendar',
  templateUrl: 'calendar.html'
})

/**
 * CalendarPage
 * Displays a month calendar, so the user can pick a specific date to view.
 * This code was originally authored by Laker007.
 * The original source code can be found at https://github.com/laker007/ionic3-calendar
 * The code has been modified to display the month and year in English.
 */
export class CalendarPage {
  public name: any = "This Month";
  public dateArray: any = [];
  public weekArray: any = [];
  public weekHead: any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public lastSelect: any = 0;
  public currentYear: any = 0;
  public currentMonth: any = 0;
  public currentDate: any = 0;
  public currentDay: any = 0;
  public displayYear: any = 0;
  public displayMonth: any = 0;


  constructor(public navCtrl: NavController) {
    this.currentYear = moment().year();
    this.currentMonth = moment().month();
    this.currentDate = moment().date();
    this.currentDay = moment().day();

    this.today();
  }

  /**
   * daySelect - Displays the dailyPage for the selected date
   * @param selected day on calendar
   */
  daySelect = (selected): void => {
    var a = moment();
    var b = moment([selected.year, selected.month, selected.date]);
    var d = b.diff(a, 'days');
    if(d >= 0) {
      d += 1;
    }
    this.navCtrl.push(DailyPage, {
      'ahead': d
    });
  }

  /**
   * today - finds today within the dateArray
   */
  today = (): void => {
    //Set display date to current date.
    this.displayYear = this.currentYear;
    this.displayMonth = this.currentMonth;
    this.displayMonth = moment().month(this.displayMonth).format('MMMM');
    this.createMonth(this.currentYear, this.currentMonth);

    // Finds today's date in the dateArray.
    var todayIndex = _.findIndex(this.dateArray, {
        year: this.currentYear,
        month: this.currentMonth,
        date: this.currentDate,
        isThisMonth: true
    });
    this.lastSelect = todayIndex;
    this.dateArray[todayIndex].isSelect = true;
  }

  /**
   * createMonth - Creates the calendar display of the current month.
   * @param  {year}   year
   * @param  {month}  month
   */
  createMonth = (year, month): void => {
    this.dateArray = [];
    this.weekArray = [];
    var firstDay;
    var preMonthDays;
    var monthDays;
    var weekDays = [];

    //set firstday to the first of the current month
    firstDay = moment({ year: year, month: month, date: 1 }).day();

    // The number of days last month
    if (month === 0) {  //Case for January
        preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
    }
    else {    //Case for every other month.
        preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
    }
    //Get the amount of days in the current month
    monthDays = moment({ year: year, month: month }).daysInMonth();

    //If the month doesn't start on a sunday, fill in the days before with last month.
    if (firstDay !== 7) {
        var lastMonthStart = preMonthDays - firstDay + 1;
        //Add the days into the dateArray
        for (var i = 0; i < firstDay; i++) {
            if (month === 0) {  //case for January
                this.dateArray.push({
                    year: year,
                    month: 11,
                    date: lastMonthStart + i,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                });
            }
            else {  //Case for all other months
                this.dateArray.push({
                    year: year,
                    month: month - 1,
                    date: lastMonthStart + i,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                });
            }
        }
    }

    //Add dates from the current month into the dateArray
    for (var i = 0; i < monthDays; i++) {
        this.dateArray.push({
            year: year,
            month: month,
            date: i + 1,
            isThisMonth: true,
            isToday: false,
            isSelect: false,
        });
    }

    //Find the current day in the dateArray and mark it as today.
    if (this.currentYear === year && this.currentMonth === month) {
        var todayIndex = _.findIndex(this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true
        });
        this.dateArray[todayIndex].isToday = true;
    }

    // Adds days of the next month to fill the end of the calendar
    if (this.dateArray.length % 7 !== 0) {
        var nextMonthAdd = 7 - this.dateArray.length % 7;
        for (var i = 0; i < nextMonthAdd; i++) {
            //Case for when month is December
            if (month === 11) {
                this.dateArray.push({
                    year: year,
                    month: 0,
                    date: i + 1,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                });
            }
            // Case for every other month
            else {
                this.dateArray.push({
                    year: year,
                    month: month + 1,
                    date: i + 1,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                });
            }
        }
    }

    // At this point all date data is added to the dateArray array
    // Insert the date data into the new array every 7 days
    for (var i = 0; i < this.dateArray.length / 7; i++) {
        for (var j = 0; j < 7; j++) {
            weekDays.push(this.dateArray[i * 7 + j]);
        }
        this.weekArray.push(weekDays);
        weekDays = [];
    }
  }
}
