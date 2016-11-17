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
	$scope.meals = []; // Initialize the meals array, so we can append data.
	
	var minTime = new Date();
	var maxTime = new Date();
	
	minTime.setHours(0, 0, 0, 0); // Last Midnight
	maxTime.setHours(24, 0, 0,0); // Next Midnight
	
	var queryString = buildQueryString(minTime, maxTime);
	
	jQuery.getJSON(queryString, function(data) {
		for(i in data['items']) {
			item = data['items'][i];
			var eventStart         = item.start.dateTime;
			var eventStartFriendly = moment(eventStart).format('h:mm a');
			$scope.meals.push({title: item.summary, date: eventStartFriendly, description: item.description}); 
		}
	});
})

.controller('WeekCtrl', function($scope) {
	$scope.meals = []; // Initialize the meals array, so we can append data.
	
	var minTime = new Date();
	var maxTime = new Date();
	
	minTime.setHours(0, 0, 0, 0); 
	minTime.setDate (minTime.getDate() + 1); // Tomorrow
	
	maxTime.setHours(24, 0, 0,0); 
	maxTime.setDate (maxTime.getDate() + 7); // One week from today.
	
	var queryString = buildQueryString(minTime, maxTime);
	
	jQuery.getJSON(queryString, function(data) {
		for(i in data['items']) {
			item = data['items'][i];
			var eventStart         = item.start.dateTime;
			var eventStartFriendly = moment(eventStart).format('MMMM Do [at] h:mm a');
			$scope.meals.push({title: item.summary, date: eventStartFriendly, description: item.description}); 
		}
	});
})

.controller('PreferencesCtrl', function($scope) {
	$scope.notifications = []; // Initialize the meals array, so we can fetch data.
	
	angular.element(document).ready(function () {
		$scope.notifications.favorites = window.localStorage.getItem("notifications.favorites") === 'true';
		$scope.notifications.reminders = window.localStorage.getItem("notifications.reminders") === 'true';
		$scope.notifications.when      = window.localStorage.getItem("notifications.when");
    });
	
	$scope.toggleFavorites = function(value) {
		window.localStorage.setItem("notifications.favorites", value);
	}
	
	$scope.toggleReminders = function(value) {
		window.localStorage.setItem("notifications.reminders", value);
	}
	
	$scope.toggleWhen = function(value) {
		window.localStorage.setItem("notifications.when", value);
	}
})

.controller('FavoritesCtrl', function($scope, $ionicModal) {
	$scope.favorites = []; // Initialize the favorites array, so we can append data.
	
	$ionicModal.fromTemplateUrl('new-favorite.html', function(modal) {
		$scope.favoriteModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
  
    $scope.createFavorite = function(favorite) {
		$scope.favorites.push({
			title: favorite.title
		});
		$scope.favoriteModal.hide();
		favorite.title = "";
	};
  
    $scope.newFavorite = function() {
		$scope.favoriteModal.show();
	};
	
    $scope.closeNewFavorite = function() {
		$scope.favoriteModal.hide();
	};
});
