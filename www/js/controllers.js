const GAPI_CLIENT_ID      = 'AIzaSyCTUS5CwqjAAhll3PeAIgEtnsCrXZSFQj4'; /* This is safe, since the key is restricted to our app. */
const GAPI_DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const GAPI_CALENDAR       = 'mtu.edu_5fq1ohnvr8u8tu9p8rec395sg0@group.calendar.google.com';

/**
 * If we load the Google API using Script tags, we don't know when it is
 * initialized. Using the jQuery getScript() function, we can fire a
 * method once a script has been loaded. We use this to initialize
 * Angular, since our Angular code relies on the Google API.
 */
$.getScript('https://apis.google.com/js/api.js', function() {
  gapi.load('client:auth2', function() {
    var injector = angular.bootstrap(document, ['starter']); /* Initialize Angular, now that the Google API is loaded. */
  });
});

angular.module('starter.controllers', []).controller('TodayCtrl', function($scope, $ionicLoading, $state) {

  /**
   * LoadGapi
   * Authenticates with the Google API using the key and discovery docs provided.
   */
  $scope.loadGapi = function() {
    if(gapi.client) {
      var options = { 'apiKey': GAPI_CLIENT_ID, 'discoveryDocs': GAPI_DISCOVERY_DOCS };
      gapi.client.init(options).then(function() {
        console.log('Authenticated, no errors');
        gapi.client.load('calendar', 'v3', $scope.onCalendarLoad());
      });
    } else {
      console.log('Gapi not loaded');
      $scope.empty = true;
      $scope.meals = [];
      $scope.$apply();
    }
  }

  /**
   * OnCalendarLoad
   * Called when the Calendar API has been loaded. Requests the events list for the calendar id provided.
   */
  $scope.onCalendarLoad = function() {
    console.log('Requesting events list for ' + GAPI_CALENDAR);
    var minTime = new Date();
    var maxTime = new Date();
    minTime.setHours(0 , 0, 0, 0); /* Last Midnight */
    maxTime.setHours(24, 0, 0, 0); /* Next Midnight */
    var parameters = {
      'calendarId': GAPI_CALENDAR,
      'timeMin': minTime.toISOString(),
      'timeMax': maxTime.toISOString(),
      'singleEvents': true,
      'orderBy': 'startTime'
    };
    gapi.client.calendar.events.list(parameters).then(function(response) {
      console.log('Events list has arrived');
      $scope.onCalendarLoadData(response); /* Send the data to be parsed */
    });
  }

  /**
   * OnCalendarLoadData
   * Called when the events list has been loaded for the provided calendar id.
   * @param Object[] response from the Google API
   */
  $scope.onCalendarLoadData = function(response) {
    var events = response.result.items;
    var temp = [];
    if(events.length > 0) {
      events.forEach(function(item, index, array) {
        var when = item.start.dateTime;
        when = moment(when).format('h:mm a'); /* Convert to a more user-friendly time and date format. */
        var structure = {
          'title': item.summary,
          'description': item.description,
          'date': when
        };
        console.log('Title: ' + item.summary + ', description: ' + item.description + ', date: ' + when);
        temp.push(structure);
      });
      $scope.empty = false; /* Let the frontend know that the response contained data. */
      $scope.meals = temp;
      $scope.$apply();
    } else {
      console.log('No response, clearing old items');
      $scope.meals = [];
      $scope.empty = true; /* Let the frontend know that the response was empty. */
      $scope.$apply();
    }
    $ionicLoading.hide(); /* The content has been loaded, remove the spinner. */
  }

  /**
   * DoRefresh
   * Called when the user has requested a refresh.
   */
  $scope.doRefresh = function() {
    console.log('Refreshing');
    $scope.loadGapi();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $ionicLoading.show(); /* Display a spinner until the content is loaded. */
  $scope.loadGapi();
});
