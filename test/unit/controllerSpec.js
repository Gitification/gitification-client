/**
 * Created with JetBrains WebStorm.
 * User: vincent
 * Date: 5/14/13
 * Time: 10:39 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

/* jasmine specs for controllers go here */
describe('user controllers', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('gamificationServices'));

    describe('UserDetailCtrl', function () {
            var scope, ctrl, $httpBackend,
                oneUser = function () {
                    return{
                        application_id: 1,
                        login: "admin",
                        firstname: "Vincent",
                        lastname: "Grivel",
                        email: "vincent@test.ch",
                        user_id: "1"
                    }
                };
            var oneUserBadges = function () {
                return {user_id: 1,
                    badges_list: []
                }
            };


            beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('http://ks25416.kimsufi.com/api/applications/1/users/1').
                    respond(oneUser());
                $httpBackend.expectGET('http://ks25416.kimsufi.com/api/applications/1/users/1/badges').
                    respond(oneUserBadges());

                $routeParams.appid = '1';
                $routeParams.userid = '1';
                scope = $rootScope.$new();
                ctrl = $controller(UserDetailCtrl, {$scope: scope});
            }));


            it('should create "user" model with fetched from xhr', function () {

                $httpBackend.flush();

                expect(scope.user).toEqualData(
                    oneUser());
                expect(scope.badges).toEqualData(
                    oneUserBadges());
            });
        }
    );
});