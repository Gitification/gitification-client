'use strict';

/* App Module */


angular.module('gamification', ['gamificationServices']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/application', {templateUrl: 'partials/application.html', controller: ApplicationCtrl}).
            when('/badge', {templateUrl: 'partials/badge.html', controller: BadgeCtrl}).
            when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
            when('/user', {templateUrl: 'partials/user.html', controller: UserCtrl}).
            when('/user/create', {templateUrl: 'partials/userCreate.html', controller: UserCreateCtrl}).
            when('/user/:userid', {templateUrl: 'partials/userModify.html', controller: UserModifyCtrl}).
            otherwise({redirectTo: '/home'});
    }]);