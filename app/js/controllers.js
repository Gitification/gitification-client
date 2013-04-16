/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors : Vincent Pasquier, Vincent Grivel
 *			Dorian Gambin, Geoffrey Papaux
 *
 * Purpose : Implementation of the controller
 *
 *********************************************************/

'use strict';

/* Controllers */

/*
 * Application main controller
 */
function ApplicationCtrl($scope, $location, Applications) {
    $scope.allApps = Applications.query();
    $scope.create = function () {
        $location.path('/application/create');
    };
}

/*
 * Application creation controller
 */
function ApplicationCreateCtrl($scope, $location, Applications) {
    $scope.app = Applications.get({appId: 0});
    $scope.create = function (app) {
        app.$create();
        $location.path('/application');
    };
    $scope.cancel = function () {
        $location.path('/application');
    };
}

/*
 * Badge main controller
 */
function BadgeCtrl($scope, $location, Badges) {
    $scope.allBadges = Badges.query({appId: 1});

    $scope.modify = function (badge) {
        $location.path('/badge/' + badge.badge_id);
    };

    $scope.create = function () {

        $location.path('/badge/create');
    };
}

/*
 * Badge modification controller
 */
function BadgeModifyCtrl($scope, $routeParams, $location, Badges) {
    $scope.badge = Badges.get({appId: 1, badgeId: $routeParams.badgeid});

    $scope.update = function (badge) {
        badge.$update({appId: 1, badgeId: badge.badge_id});
        $location.path('/badge');
    };
    $scope.cancel = function () {
        $location.path('/badge');
    };
}

/*
 * Badge creation controller
 */
function BadgeCreateCtrl($scope, $location, Badges) {
    //why need to add the following line for
    $scope.badge = Badges.get({appId: 1, badgeId: 0});
    $scope.create = function (badge) {
        badge.$create({appId: 1});
        $location.path('/badge');
    };
    $scope.cancel = function () {
        $location.path('/badge');
    };
}

/*
 * Event main controller
 */
function EventCtrl($scope) {

}

/*
 * Rule main controller
 */
function RuleCtrl($scope) {

}

/*
 * Leaderboard controller
 */
function HomeCtrl($scope, Leaderboard) {
    $scope.leaderboard = Leaderboard.query({appId: 1});


}

/*
* User main controller
 */
function UserCtrl($scope, $location, Users) {
    $scope.allUsers = Users.query({appId: 1});

    $scope.modify = function (user) {
        $location.path('/user/' + user.user_id);
    };
    $scope.detail = function (user) {
        $location.path('/user/detail/' + user.user_id);
    };
    $scope.delete = function (user) {
        //TODO remove the next line when the persistance is ok.
        $scope.allUsers.splice(0, 1);
        Users.remove({appId: 1, userId: user.user_id});
        $location.path('/user');
    };
    $scope.create = function () {

        $location.path('/user/create');
    };

}

/*
* User modification controller
 */
function UserModifyCtrl($scope, $routeParams, $location, Users) {
    $scope.user = Users.get({appId: 1, userId: $routeParams.userid});

    $scope.update = function (user) {
        user.$update({appId: 1, userId: user.user_id});
        $location.path('/user');
    };
    $scope.cancel = function () {
        $location.path('/user');
    };
}

/*
 * User detail controller
 */
function UserDetailCtrl($scope, $routeParams, $location, Users) {
    $scope.user = Users.get({appId: 1, userId: $routeParams.userid});
    $scope.badges = Users.get({appId: 1, userId: $routeParams.userid, badge: 'badges'});
    $scope.cancel = function () {
        $location.path('/user');
    };
}

/*
* User creation controller
 */
function UserCreateCtrl($scope, $location, Users) {
    //why need to add the following line for
    $scope.user = Users.get({appId: 1, userId: 0});
    $scope.create = function (user) {
        user.$create({appId: 1});
        $location.path('/user');
    };
    $scope.cancel = function () {
        $location.path('/user');
    };
}


