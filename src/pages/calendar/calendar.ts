/**
  * This Calendar code was originally created by laker007.
  * It can be found at https://github.com/laker007/ionic3-calendar
  */


import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import * as _ from "lodash";
import { DailyPage } from '../daily/daily';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})

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

  today = (): void => {
    this.displayYear = this.currentYear;
    this.displayMonth = this.currentMonth;
    this.displayMonth = moment().month(this.displayMonth).format('MMMM');
    this.createMonth(this.currentYear, this.currentMonth);

    var todayIndex = _.findIndex(this.dateArray, {
        year: this.currentYear,
        month: this.currentMonth,
        date: this.currentDate,
        isThisMonth: true
    });
    this.lastSelect = todayIndex;
    this.dateArray[todayIndex].isSelect = true;

  }

  createMonth = (year, month): void => {
    this.dateArray = [];
    this.weekArray = [];
    var firstDay;
    var preMonthDays;
    var monthDays;
    var weekDays = [];
    firstDay = moment({ year: year, month: month, date: 1 }).day();
    // 上个月天数
    if (month === 0) {
        preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
    }
    else {
        preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
    }

    monthDays = moment({ year: year, month: month }).daysInMonth();

    if (firstDay !== 7) {
        var lastMonthStart = preMonthDays - firstDay + 1;
        for (var i = 0; i < firstDay; i++) {
            if (month === 0) {
                this.dateArray.push({
                    year: year,
                    month: 11,
                    date: lastMonthStart + i,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                });
            }
            else {
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
    if (this.currentYear === year && this.currentMonth === month) {
        var todayIndex = _.findIndex(this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true
        });
        this.dateArray[todayIndex].isToday = true;
    }

    if (this.dateArray.length % 7 !== 0) {
        var nextMonthAdd = 7 - this.dateArray.length % 7;
        for (var i = 0; i < nextMonthAdd; i++) {
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
    // 至此所有日期数据都被添加入 dateArray 数组中
    // 将日期数据按照每 7 天插入新的数组中
    for (var i = 0; i < this.dateArray.length / 7; i++) {
        for (var j = 0; j < 7; j++) {
            weekDays.push(this.dateArray[i * 7 + j]);
        }
        this.weekArray.push(weekDays);
        weekDays = [];
    }
  }
}
