// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','ngMap'])

.run(function($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
    });
    $ionicPlatform.registerBackButtonAction(function (e) {
        if ($ionicHistory.backView()) {
            $ionicHistory.goBack();
        } else {
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortTop("Press Again to Exit.");
                setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }
        e.preventDefault();
        return false;
    }, 101);
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    //設定全域返回鍵，去除標示的text，並統一套用icon
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon('ion-chevron-left');
    $ionicConfigProvider.backButton.text('')
    $stateProvider
        .state('lobby', {
          url: '/lobby',
          templateUrl: 'templates/lobby.html',
          controller: 'LobbyCtrl'
        })
        .state('Stalls', {
          url: '/Stall',
          templateUrl: 'templates/Stalls.html',
          controller: 'StallsCtrl'
        })
		.state('school', {
          url: '/school',
          templateUrl: 'templates/school.html',
          controller: 'SchoolSearchCtrl'
        })
        .state('search_area', {
          url: '/search_area',
          templateUrl: 'templates/school/search_area.html',
          controller: 'SchoolSearchCtrl'
        })
        .state('search_result', {
          url: '/search_result',
          templateUrl: 'templates/school/search_result.html',
          controller: 'SchoolSearchCtrl'
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
          controller: 'NewsCtrl'
        })
        
        .state('Questionnaire', {
          url: '/Questionnaire',
          templateUrl: 'templates/Questionnaire.html',
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
        
        .state('photos', {
          url: '/photos',
          templateUrl: 'templates/photos.html',
          controller: 'PhotosCtrl'
        })
        .state('like_list', {
          url: '/like_list',
          templateUrl: 'templates/like_list.html',
          controller: 'LikeListCrtl'
        })
        .state('lecturetime', {
          url: '/lecturetime',
          templateUrl: 'templates/lectures.html',
          controller: 'LecturetimeCrtl'
        })
        .state('others', {
          url: '/others',
          templateUrl: 'templates/others.html',
          controller: 'OtherCtrl'
        })
<<<<<<< HEAD

=======
        .state('search_area', {
          url: '/search_area',
          templateUrl: 'templates/school/search_area.html',
          /*controller: 'PlaylistsCtrl'*/
        })
        .state('search_result', {
          url: '/search_result',
          templateUrl: 'templates/school/search_result.html',
          /*controller: 'SchoolInfoCtrl'*/
        })
>>>>>>> 84aa8e9daf3b4f7db986ef83e524cb0ad765a6a2
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/lobby'); //這是頁面起始點
})
;
