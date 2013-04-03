'use strict';

/* Controllers */

function ApplicationCtrl($scope) {

}

function BadgeCtrl($scope) {

}

function HomeCtrl($scope) {

}

function UserCtrl($scope, Users) {
	$scope.allUsers = Users.all({appId: 1});
}

