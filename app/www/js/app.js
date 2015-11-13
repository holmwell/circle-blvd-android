// Circle Blvd App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'circle-blvd' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('circle-blvd', ['ionic', 'circle-blvd.controllers', 'circle-blvd.services'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])

.config(function ($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'SignInCtrl'
  })

  .state('circles', {
    url: '/circles',
    templateUrl: 'templates/circles.html',
    controller: 'CirclesCtrl'
  })

  .state('list', {
    url: '/list/:listId',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl'
  })

  .state('task', {
    url: '/task/:taskId',
    templateUrl: 'templates/task.html',
    controller: 'TaskCtrl'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');

});

angular.module('circle-blvd.services', []);
angular.module('circle-blvd.controllers', ['circle-blvd.services']);

