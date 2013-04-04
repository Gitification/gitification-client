/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors	:	Vincent Pasquier, Vincent Grivel
 *						Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :	Implementation of the controller
 *
 *********************************************************/

'use strict';

/* Controllers */

function ApplicationCtrl($scope) {

}

function BadgeCtrl($scope) {

}

function HomeCtrl($scope) {

}

function UserCtrl($scope, $location, Users) {
    $scope.allUsers = Users.query({appId: 1});

    $scope.modify = function(user){
        $location.path('/user/' + user.user_id);
    }
    $scope.delete = function(user){
        //TODO remove the next line when the persistance is ok.
        $scope.allUsers.splice(0,1);
        Users.delete({appId: 1, userId: user.user_id});
        $location.path('/user');
    }
    $scope.create = function(){

        $location.path('/user/create');
    }

}

/*
* User modification controller
 */
function UserModifyCtrl($scope,$routeParams, $location, Users) {
    $scope.user = Users.get({appId: 1, userId: $routeParams.userid});

    $scope.update = function(user){
        user.$update({appId: 1, userId: user.user_id});
        $location.path('/user');
    }
    $scope.cancel = function(){
        $location.path('/user');
    }
}

/*
* User creation controller
 */
function UserCreateCtrl($scope, $location, Users){

    $scope.create = function(user){
        Users.save({appId: 1, postData: user});
        //user.$save({appId: 1});
        $location.path('/user');
    }
    $scope.cancel = function(){
        $location.path('/user');
    }
}


