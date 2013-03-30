'use strict';

/* App Module */

angular.module('gamification', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/application', {templateUrl: 'partials/application.html', controller: ApplicationCtrl}).
      when('/badge', {templateUrl: 'partials/badge.html', controller: BadgeCtrl}).
      when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
      when('/user', {templateUrl: 'partials/user.html', controller: UserCtrl}).
      otherwise({redirectTo: '/home'});
}]);