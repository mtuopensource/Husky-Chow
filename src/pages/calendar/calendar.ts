import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import * as _ from "lodash";

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

  }

  today = (): void => {
    this.displayYear = this.currentYear;
    this.displayMonth = this.currentMonth;
    this.displayMonth = moment().month(this.displayMonth).format('MMMM');
    this.createMonth(this.currentYear, this.currentMonth);
    // 将今天标记为选择状态
    var todayIndex = _.findIndex(this.dateArray, {
        year: this.currentYear,
        month: this.currentMonth,
        date: this.currentDate,
        isThisMonth: true
    });
    this.lastSelect = todayIndex;
    this.dateArray[todayIndex].isSelect = true;
    //this.onDaySelect.emit(this.dateArray[todayIndex]);
  }

  createMonth = (year, month): void => {
    this.dateArray = []; // 清除上个月的数据
    this.weekArray = []; // 清除数据
    var firstDay; //当前选择月份的 1 号星期几,决定了上个月取出几天出来。星期日不用显示上个月，星期一显示上个月一天，星期二显示上个月两天
    var preMonthDays; // 上个月的天数
    var monthDays; // 当月的天数
    var weekDays = [];
    firstDay = moment({ year: year, month: month, date: 1 }).day();
    // 上个月天数
    if (month === 0) {
        preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
    }
    else {
        preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
    }
    // 本月天数
    monthDays = moment({ year: year, month: month }).daysInMonth();
    // 将上个月的最后几天添加入数组
    if (firstDay !== 7) {
        var lastMonthStart = preMonthDays - firstDay + 1; // 从上个月几号开始
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
    // 将本月天数添加到数组中
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
    // 将下个月天数添加到数组中，有些月份显示 6 周，有些月份显示 5 周
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
