angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); // Hide the accessory bar by default.
		  cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
		  StatusBar.styleDefault(); // Require Cordova status bar.
		}
	});
})

.config(function($ionicConfigProvider) {
	$ionicConfigProvider.scrolling.jsScrolling(false);
	$ionicConfigProvider.navBar.alignTitle('center');
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
	})
	.state('app.favorites', {
		url: '/favorites',
		views: {
			'menuContent': {
				templateUrl: 'templates/favorites.html',
				controller: 'FavoritesCtrl'
			}
		}
	})
	.state('app.preferences', {
		url: '/preferences',
		views: {
			'menuContent': {
				templateUrl: 'templates/preferences.html',
				controller: 'PreferencesCtrl'
			}
		}
    })
	.state('app.about', {
		url: '/about',
		views: {
			'menuContent': {
				templateUrl: 'templates/about.html'
			}
		}
    })
	.state('app.browseweek', {
		url: '/browseweek',
		views: {
			'menuContent': {
				templateUrl: 'templates/browseweek.html',
				controller: 'WeekCtrl'
			}
		}
    })
    .state('app.browse', {
		url: '/browse',
		views: {
			'menuContent': {
				templateUrl: 'templates/browse.html',
				controller: 'TodayCtrl'
			}
		}
    });
	
	$urlRouterProvider.otherwise('/app/browse'); // If none of the above states are matched, use this as the fallback.
});
