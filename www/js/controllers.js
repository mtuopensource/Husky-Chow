/*
 * With the new view caching in Ionic, Controllers are only called
 * when they are recreated or on app start, instead of every page change.
 * To listen for when this page is active (for example, to refresh data),
 * listen for the $ionicView.enter event:
 * $scope.$on('$ionicView.enter', function(e) {});
 */
 
const calendar_url    = "https://www.googleapis.com/calendar/v3/calendars/";
const calendar_id     = "mtu.edu_5fq1ohnvr8u8tu9p8rec395sg0@group.calendar.google.com";
const calendar_type   = "/events";
const calendar_api    = "?key=AIzaSyAZUkB04TYfM0ATzxlkPIAh48SHWPj_U5k";
const calendar_single = "&singleEvents=true";
const calendar_order  = "&orderBy=startTime";

function buildQueryString(timeMin, timeMax) {
	var query = calendar_url + calendar_id + calendar_type + calendar_api
		+ calendar_single + calendar_order + "&timeMin="
		+ timeMin.toISOString() + "&timeMax=" + timeMax.toISOString();
		
	return query;
}

angular.module('starter.controllers', [])

.controller('TodayCtrl', function($scope) {
	$scope.meals = []; // Initialize the meals array.
  var startTime = new Date();
  startTime.setHours(0,0,0,0); //Last Midnight
  var endTime   = new Date();
  endTime.setHours(24,0,0,0); //Next Midnight
  var url = buildQueryString(startTime, endTime);
	jQuery.getJSON(url, function(data) {
    for(i in data['items']) {
        item = data['items'][i];
		var startDateTime = item.start.dateTime;
		var today = moment(startDateTime).format('h:mm a');
		$scope.meals.push({title: item.summary, date: today, description: item.description}); 
    }
})
})

.controller('WeekCtrl', function($scope) {
	$scope.meals = []; // Initialize the meals array.
  var startTime = new Date();
  startTime.setHours(0,0,0,0); //Last Midnight
  
  var endTime   = new Date();
  endTime.setDate(endTime.getDate() + 7);
  endTime.setHours(24,0,0,0); //Next Midnight
  
  var url = buildQueryString(startTime, endTime);
	jQuery.getJSON(url, function(data) {
    for(i in data['items']) {
        item = data['items'][i];
		var startDateTime = item.start.dateTime;
		var today = moment(startDateTime).format('MMMM Do [at] h:mm a');
		$scope.meals.push({title: item.summary, date: today, description: item.description}); 
    }
})

});





