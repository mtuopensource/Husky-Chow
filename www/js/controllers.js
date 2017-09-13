// Client ID and API key from the Developer Console
 var CLIENT_ID = '488845883724-fg4ikd4109ajr003muijshr1la6q17g3.apps.googleusercontent.com';

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";



 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
   gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */


 var signedIn = false;


 function initClient() {
   gapi.client.init({
     discoveryDocs: DISCOVERY_DOCS,
     clientId: CLIENT_ID,
     scope: SCOPES
   }).then(function () {
     // Listen for sign-in state changes.
     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());




   });
 }

var $myScope;

function updateSigninStatus(value) {
  if(value) {
    var meals = listUpcomingEvents();
    $myScope.meals = meals;
    $myScope.$apply();
  } else {
    gapi.auth2.getAuthInstance().signIn({ux_mode:'redirect'});
  }
}




 /**
  * Print the summary and start datetime/date of the next ten events in
  * the authorized user's calendar. If no events are found an
  * appropriate message is printed.
  */
 function listUpcomingEvents() {
   var meals = [];

   var minTime = new Date();
   var maxTime = new Date();

   minTime.setHours(0, 0, 0, 0); // Last Midnight
   maxTime.setHours(24, 0, 0,0); // Next Midnight

   gapi.client.calendar.events.list({
     'calendarId': 'mtu.edu_5fq1ohnvr8u8tu9p8rec395sg0@group.calendar.google.com',
     'timeMin': minTime.toISOString(),
     'timeMax': maxTime.toISOString(),
     'showDeleted': false,
     'singleEvents': true,
     'orderBy': 'startTime'
   }).then(function(response) {
     var events = response.result.items;


     if (events.length > 0) {
       for (i = 0; i < events.length; i++) {
         var event = events[i];
         var when = event.start.dateTime;
         if (!when) {
           when = event.start.date;
         }

   			var eventStartFriendly = moment(when).format('h:mm a');
   			meals.push({title: event.summary, date: eventStartFriendly, description: event.description});

       }
     } else {
      console.log('No upcoming events found');
     }
   });
   return meals;
 }








/*
 * With the new view caching in Ionic, Controllers are only called
 * when they are recreated or on app start, instead of every page change.
 * To listen for when this page is active (for example, to refresh data),
 * listen for the $ionicView.enter event:
 * $scope.$on('$ionicView.enter', function(e) {});
 */



angular.module('starter.controllers', [])

.controller('TodayCtrl', function($scope) {
	$scope.meals = []; // Initialize the meals array, so we can append data.

  $myScope = $scope;
})

.controller('WeekCtrl', function($scope) {
	$scope.meals = []; // Initialize the meals array, so we can append data.

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
