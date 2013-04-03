'use strict';

/* Services  params:{appId:'1'}, */

angular.module('gamificationServices', ['ngResource']).
    factory('Users', function($resource){
  return $resource('http://localhost\\:8080/applications/:appId/users', {
  	appId:'@appId'
  }, {
    all: {
    	method: 'GET', 
    	isArray:true}, 
    get: {
    	method: 'GET'
    	}
  });
});