/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors	:	Vincent Pasquier, Vincent Grivel
 *						Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :	Implementation of the services that manage the resources
 *
 *********************************************************/

'use strict';

/* Services  params:{appId:'1'}, */

angular.module('gamificationServices', ['ngResource']).
    factory('Users', function ($resource) {
        return $resource('http://localhost\\:8080/applications/:appId/users/:userId', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true},
            get: {
                method: 'GET',
                userId: '@userId'},
            delete: {
                method: 'DELETE',
                userId: '@userId'},
            save: {
                method: 'POST',
                postData: '@postData',
                headers: {'Content-Type': 'application/json'},
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                userId: '@userId'}

            }
        });
    });