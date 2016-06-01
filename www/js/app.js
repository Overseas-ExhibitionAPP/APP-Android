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
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    //設定全域返回鍵，去除標示的text，並統一套用icon
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon('ion-chevron-left');
    $ionicConfigProvider.backButton.text('')
    $stateProvider
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
          controller: 'ThemeEventsCtrl'
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
          controller: 'QuestionnaireSelect'
<<<<<<< HEAD

=======
>>>>>>> origin/jeff.dev
        })
        
        .state('photos', {
          url: '/photos',
          templateUrl: 'templates/photos.html',
          controller: 'PlaylistsCtrl'
        })
        .state('like_list', {
          url: '/like_list',
          templateUrl: 'templates/like_list.html',
          controller: 'LikeListCrtl'
        })
        .state('others', {
          url: '/others',
          templateUrl: 'templates/others.html',
          controller: 'PlaylistsCtrl'
        })
        .state('Q1-1', {
          url: '/Q1-1',
          templateUrl: 'templates/Questionnaire/Q1-1.html',
          controller: 'QuestionnaireSelect'
        })
		.state('Q_show', {
          url: '/Q_show',
          templateUrl: 'templates/Questionnaire/Q_show.html',
          controller: 'QuestionnaireSelect'
        })
        .state('Q-end', {
          url: '/Q-end',
          templateUrl: 'templates/Questionnaire/Q-end.html',
          controller: 'QuestionnaireSelect'
        })
        .state('search_area', {
          url: '/search_area',
          templateUrl: 'templates/school/search_area.html',
          controller: 'PlaylistsCtrl'
        })
        .state('search_result', {
          url: '/search_result',
          templateUrl: 'templates/school/search_result.html',
          controller: 'SchoolInfoCtrl'
        })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index'); //這是頁面起始點
});
