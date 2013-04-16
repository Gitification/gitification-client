'use strict';

/* App Module */


angular.module('gamification', ['gamificationServices']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/application', {templateUrl: 'partials/application.html', controller: ApplicationCtrl}).
            when('/application/create', {templateUrl: 'partials/applicationCreate.html', controller: ApplicationCreateCtrl}).
            when('/badge', {templateUrl: 'partials/badge.html', controller: BadgeCtrl}).
            when('/badge/create', {templateUrl: 'partials/badgeCreate.html', controller: BadgeCreateCtrl}).
            when('/badge/:badgeid', {templateUrl: 'partials/badgeModify.html', controller: BadgeModifyCtrl}).
            when('/event', {templateUrl: 'partials/event.html', controller: EventCtrl}).
            when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
            when('/rule', {templateUrl: 'partials/rule.html', controller: RuleCtrl}).
            when('/user', {templateUrl: 'partials/user.html', controller: UserCtrl}).
            when('/user/detail/:userid', {templateUrl: 'partials/userDetail.html', controller: UserDetailCtrl}).
            when('/user/create', {templateUrl: 'partials/userCreate.html', controller: UserCreateCtrl}).
            when('/user/:userid', {templateUrl: 'partials/userModify.html', controller: UserModifyCtrl}).
            otherwise({redirectTo: '/home'});
    }]);