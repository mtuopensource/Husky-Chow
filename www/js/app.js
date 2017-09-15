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


	.state('app.about', {
		url: '/about',
		views: {
			'menuContent': {
				templateUrl: 'templates/about.html'
			}
		}
    })

	.state('app.contact', {
		url: '/contact',
				views: {
			'menuContent': {
				templateUrl: 'templates/contact.html'
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
