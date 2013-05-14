'use strict';

/* App Module */


angular.module('gamification', ['gamificationServices']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/application', {templateUrl: 'partials/application.html', controller: ApplicationCtrl}).
            when('/application/create', {templateUrl: 'partials/applicationCreate.html', controller: ApplicationCreateCtrl}).
            when('/:appid/badge', {templateUrl: 'partials/badge.html', controller: BadgeCtrl}).
            when('/:appid/badge/create', {templateUrl: 'partials/badgeCreate.html', controller: BadgeCreateCtrl}).
            when('/:appid/badge/:badgeid', {templateUrl: 'partials/badgeModify.html', controller: BadgeModifyCtrl}).
            when('/:appid/type', {templateUrl: 'partials/type.html', controller: EventTypeCtrl}).
            when('/:appid/type/create', {templateUrl: 'partials/typeCreate.html', controller: EventTypeCreateCtrl}).
            when('/:appid/type/:typeid', {templateUrl: 'partials/typeModify.html', controller: EventTypeModifyCtrl}).
            when('/:appid/home', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
            when('/:appid/rule', {templateUrl: 'partials/rule.html', controller: RuleCtrl}).
            when('/:appid/rule/create', {templateUrl: 'partials/ruleCreate.html', controller: RuleCreateCtrl}).
            when('/:appid/rule/:ruleid', {templateUrl: 'partials/ruleModify.html', controller: RuleModifyCtrl}).
            when('/:appid/user', {templateUrl: 'partials/user.html', controller: UserCtrl}).
            when('/:appid/user/detail/:userid', {templateUrl: 'partials/userDetail.html', controller: UserDetailCtrl}).
            when('/:appid/user/create', {templateUrl: 'partials/userCreate.html', controller: UserCreateCtrl}).
            when('/:appid/user/:userid', {templateUrl: 'partials/userModify.html', controller: UserModifyCtrl}).
            otherwise({redirectTo: '/application'});
    }]);

