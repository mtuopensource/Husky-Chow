const GAPI_CLIENT_ID = '488845883724-02p8jklobsj6b4iatanbpd89bem775v3.apps.googleusercontent.com';
const GAPI_SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'; /* Only request read permissions, since we won't be adding events. */
const CALENDAR_ID = 'mtu.edu_5fq1ohnvr8u8tu9p8rec395sg0@group.calendar.google.com'; /* Google Calender id */

/**
 * OnGapiLoad
 * This function is called when Gapi is initialized. We use this to initialize Angular.
 */
function onGapiLoad() {
  gapi.load('client', {
    callback: function() {
      var injector = angular.bootstrap(document, ['starter']); /* Initialize Angular, now that the Google API is loaded. */
    }
  });
}

angular.module('starter.controllers', []).controller('TodayCtrl', function($scope, $ionicLoading) {
  $ionicLoading.show(); /* Display a spinner until the content is loaded. */

  $scope.onGapiLoadCalendarData = function(json) {
    var temp = [];
    for (var i = 0; i < json.items.length; i++) {
        var item = json.items[i];
        var when = item.start.dateTime;
        when = moment(when).format('h:mm a'); // Convert to a more user-friendly time and date format.
        temp.push({
            'title': item.summary,
            'description': item.description,
            'date': when
        });
    }
    
    $scope.meals = temp;
    $ionicLoading.hide(); // We can remove the spinner, since the data is loaded.
    $scope.$apply(); // Refresh the view, since we've modified the data.
  }

  /* This function is called after Gapi has initialized the Calendar Api. */
  $scope.onGapiLoadCalendar = function() {
    var minTime = new Date();
    var maxTime = new Date();
    minTime.setHours(0 , 0, 0, 0); // Last Midnight
    maxTime.setHours(24, 0, 0, 0); // Next Midnight

    var parameters = {
        'calendarId': CALENDAR_ID,
        'timeMin': minTime.toISOString(),
        'timeMax': maxTime.toISOString(),
        'singleEvents': true,
        'showDeleted': false,
        'orderBy': 'startTime'
    };

    var request = gapi.client.calendar.events.list(parameters);
    request.execute($scope.onGapiLoadCalendarData);
  }

  /* This function is called after Gapi has authorized our request. */
  $scope.onGapiAuth = function(result) {
    if (result && !result.error) {
      console.log('Authenticated, no errors');
      gapi.client.load('calendar', 'v3', $scope.onGapiLoadCalendar);
    }
  }

  /* We can't be certain that Gapi is loaded, so double check. */
  if (gapi.auth) {
    var options = { 'client_id': GAPI_CLIENT_ID, 'scope': GAPI_SCOPES, 'immediate': true }; /* Hide the popup using immediate mode. */
    gapi.auth.authorize(options, $scope.onGapiAuth);
  }

});
