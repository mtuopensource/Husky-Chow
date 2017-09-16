const GAPI_DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const GAPI_CALENDAR = 'mtu.edu_5fq1ohnvr8u8tu9p8rec395sg0@group.calendar.google.com';
const GAPI_CLIENT_ID = 'AIzaSyCTUS5CwqjAAhll3PeAIgEtnsCrXZSFQj4';
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd9_hNwU8HRew9RcsUCLBlQUsc7LUZ64x5LZ3iCW_QGuIqM2g/formResponse';

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

angular.module('starter.controllers', []).controller('TodayCtrl', function($scope, $ionicLoading, $state, $ionicTabsDelegate) {

  /**
   * LoadGapi
   * Authenticates with the Google API using the key and discovery docs provided.
   */
  $scope.loadGapi = function() {
    if(gapi.client) {
      var options = { 'apiKey': GAPI_CLIENT_ID, 'discoveryDocs': GAPI_DISCOVERY_DOCS };
      gapi.client.init(options).then(function() {
        console.log('Authenticated, no errors');
        gapi.client.load('calendar', 'v3', function() {
          var index = $ionicTabsDelegate.selectedIndex();
          var days = 0;
          if(index == 0) {
            days = 1;
          } else if(index == 1) {
            days = 7;
          } else if(index == 2) {
            days = 31;
          }
          $scope.onCalendarLoad(days);
        });
      });
    } else {
      console.log('Gapi not loaded');
      $scope.empty = true;
      $scope.days = [];
      $scope.$apply();
    }
  }

  /**
   * OnCalendarLoad
   * Called when the Calendar API has been loaded. Requests the events list for the calendar id provided.
   */
  $scope.onCalendarLoad = function(days) {
    console.log('Requesting events list for ' + GAPI_CALENDAR);
    var minTime = new Date();
    var maxTime = new Date();
    minTime.setHours(0 , 0, 0, 0); /* Last Midnight */
    maxTime.setHours(24 * days, 0, 0, 0); /* Next Midnight */
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
    var temp = {};
    if(events.length > 0) {
      events.forEach(function(item, index, array) {
        var when = item.start.dateTime;
        var date = item.start.dateTime;
        var friendlyDate = item.start.dateTime;

        when = moment(when).format('h:mm a'); /* Convert to a more user-friendly time and date format. */
        date = moment(date).format('YYMMDD');
        friendlyDate = moment(friendlyDate).format('dddd, MMMM DD');


        if(!item.description) {
          console.log('Skipping ' + item.summary);
          return true;
        }

        var split = item.description.split(',');

        var title = item.summary.toLowerCase();
        if (title.includes("breakfast")) {
          title = "Breakfast";
        }else if (title.includes("lunch")) {
          title = "Lunch";
        }else if (title.includes("dinner") || title.includes("supper")) {
          title = "Dinner";
        }
        else if(title.includes("brunch")) {
          title = "Brunch";
        } else {
          console.log('Skipping ' + item.summary);
          return true;
        }

        var structure = {
          'title': title,
          'description': split,
          'date': when
        };

        if(!temp[date]) {
          temp[date] = {
            'friendlyDate': friendlyDate,
            'meals': []
          };
        }
        temp[date].meals.push(structure);
      });

      $scope.empty = false; /* Let the frontend know that the response contained data. */
      $scope.days = temp;
      $scope.$apply();
    } else {
      console.log('No response, clearing old items');
      $scope.days = [];
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
}).controller('SuggestionsController', function($scope, $ionicLoading, $ionicModal, $state, $ionicHistory) {
  $ionicModal.fromTemplateUrl('thankyou-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go("app.browse");
    $scope.modal.hide();
  };


  $scope.submitForm = function() {
    var name = $('#name').val();
    var phone_number = $('#phone_number').val();
    var email = $('#email').val();
    var user_experience = $('#user_experience').val();
    var aesthetics = $('#aesthetics').val();
    var device = $('#device').val();
    var compatibility = $('#compatibility').val();
    var comments = $('#comments').val();
    var request = {
      'usp': 'pp_url',
      'entry.1710756200': name, /* Name */
      'entry.1036644864': phone_number, /* Phone Number */
      'entry.118019032': email, /* Mail Address */
      'entry.328842982': Number(user_experience), /* User Experience */
      'entry.1516275287': Number(aesthetics), /* Aesthetics */
      'entry.2103220588': device, /* Device Model/Software */
      'entry.1534649750': compatibility, /* Compatibility */
      'entry.2041983297': comments /* Other Suggestions */
    };

    $.ajax({
            url: GOOGLE_FORMS_URL,
            data: request,
            type: "GET",
            dataType: "xml",
            statusCode: {
                0: function () {

                },
                200: function () {
                  console.log('Form submitted, no errors');
                }
            }
        });

        $scope.openModal();

        $('#name').val('');
        $('#phone_number').val('');
        $('#email').val('');
        $('#user_experience').val('');
        $('#aesthetics').val('');
        $('#device').val('');
        $('#compatibility').val('');
        $('#comments').val('');


  }
});
