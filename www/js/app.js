// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  /*
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })*/

	.state('index', {
      url: '/index',
      templateUrl: 'templates/index.html',
      controller: 'PlaylistsCtrl'
    })
    .state('Stalls', {
      url: '/Stall',
      templateUrl: 'templates/Stalls.html',
      controller: 'PlaylistsCtrl'
    })
	.state('school', {
      url: '/school',
      templateUrl: 'templates/school.html',
      controller: 'PlaylistsCtrl'
    })
	.state('Theme_events', {
      url: '/Theme_events',
      templateUrl: 'templates/Theme_events.html',
      controller: 'PlaylistsCtrl'
    })
    
	.state('traffic', {
      url: '/traffic',
      templateUrl: 'templates/traffic.html',
      controller: 'TrafficCtrl'
    })
	.state('news', {
      url: '/news',
      templateUrl: 'templates/news.html',
      controller: 'PlaylistsCtrl'
    })
	
	.state('Questionnaire', {
      url: '/Questionnaire',
      templateUrl: 'templates/Questionnaire.html',
      controller: 'PlaylistsCtrl'

    })
	
	.state('photos', {
      url: '/photos',
      templateUrl: 'templates/photos.html',
      controller: 'PlaylistsCtrl'
    })
	.state('like_list', {
      url: '/like_list',
      templateUrl: 'templates/like_list.html',
      controller: 'PlaylistsCtrl'
    })
	.state('others', {
      url: '/others',
      templateUrl: 'templates/others.html',
      controller: 'PlaylistsCtrl'
    })
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index'); //這是頁面起始點
});
