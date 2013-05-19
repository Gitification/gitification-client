/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors : Vincent Pasquier, Vincent Grivel
 *            Dorian Gambin, Geoffrey Papaux
 *
 * Purpose : Implementation of all controllers
 *
 *********************************************************/

'use strict';

var applicationId = 0;

/**
 * Application main controller
 * @param $scope
 * @param $location
 * @param Applications
 * @constructor
 */
function ApplicationCtrl($scope, $location, Applications) {
    $scope.allApps = Applications.query();
    $scope.create = function () {
        $location.path('/application/create');
    };
    $scope.manage = function (app) {
        $location.path('/' + app.application_id + '/home');
    };
}


/**
 * Application creation controller
 * @param $scope
 * @param $location
 * @param Applications
 * @constructor
 */
function ApplicationCreateCtrl($routeParams, $scope, $location, Applications) {
    $scope.app = Applications.get({appId: 0});
    $scope.create = function (app) {
        app.$create(
            function (data) {
                $location.path('/' + data.application_id + '/home');
            },
            function (err) {
            }
        );
    };
    $scope.cancel = function () {
        $location.path('/application');
    };
}


/**
 * Badge main controller
 * @param $scope
 * @param $location
 * @param Badges
 * @constructor
 */
function BadgeCtrl($routeParams, $scope, $location, Badges) {
    $scope.allBadges = Badges.query({appId: $routeParams.appid});


    $scope.modify = function (badge) {
        $location.path('/' + $routeParams.appid + '/badge/' + badge.badge_id);
    };

    $scope.create = function () {

        $location.path('/' + $routeParams.appid + '/badge/create');
    };
}


/**
 * Badge modification controller
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param Badges
 * @constructor
 */
function BadgeModifyCtrl($routeParams, $scope, $location, Badges) {
    $scope.badge = Badges.get({appId: $routeParams.appid, badgeId: $routeParams.badgeid});
    $scope.update = function (badge) {
        badge.$update({appId: $routeParams.appid, badgeId: badge.badge_id});
        $location.path('/' + $routeParams.appid + '/badge');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/badge');
    };
}

/**
 * Badge creation controller
 * @param $scope
 * @param $location
 * @param Badges
 * @constructor
 */
function BadgeCreateCtrl($routeParams, $scope, $location, Badges) {
    //why need to add the following line for
    $scope.badge = Badges.get({appId: $routeParams.appid, badgeId: 0});

    $scope.create = function (badge) {
        badge.$create({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/badge');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/badge');
    };
}

/**
 * Event type main controller
 * @param $scope
 * @param $location
 * @param EventsTypes
 * @constructor
 */
function EventTypeCtrl($routeParams, $scope, $location, EventsTypes) {
    $scope.allEventType = EventsTypes.query({appId: $routeParams.appid});

    $scope.modify = function (eventType) {
        $location.path('/' + $routeParams.appid + '/type/' + eventType.type_id);
    };

    $scope.create = function () {
        $location.path('/' + $routeParams.appid + '/type/create');
    };
}

/**
 * Event type created controller
 * @param $scope
 * @param $location
 * @param EventsTypes
 * @constructor
 */
function EventTypeCreateCtrl($routeParams, $scope, $location, EventsTypes) {
    $scope.eventType = EventsTypes.get({appId: $routeParams.appid, typeId: 0});

    $scope.create = function (eventType) {
        eventType.$create({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/type');
    };

    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/type');
    };
}

/**
 * Modificaiton of an event type
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param EventsType
 * @constructor
 */
function EventTypeModifyCtrl($routeParams, $scope, $location, EventsTypes) {
    $scope.eventType = EventsTypes.get({appId: $routeParams.appid, typeId: $routeParams.typeid});
    $scope.update = function (eventType) {

        eventType.$update({appId: $routeParams.appid, typeId: eventType.type_id});
        $location.path('/' + $routeParams.appid + '/type');
    };

    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/type');
    };
}


/**
 * Rule main controller
 * @param $scope
 * @param $location
 * @param Rules
 * @constructor
 */
function RuleCtrl($routeParams, $scope, $location, Rules, Badges, EventsTypes, $q) {
        function eventsTypesQuery() {
        var d = $q.defer();
        var res = EventsTypes.query({appId: $routeParams.appid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }

    function badgeQuery() {
        var d = $q.defer();
        var res = Badges.query({appId: $routeParams.appid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }
    function rulesQuery() {
        var d = $q.defer();
        var res = Rules.query({appId: $routeParams.appid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }

    $q.all([
            rulesQuery(),
            badgeQuery(),
            eventsTypesQuery()
        ]).
        then(function (data) {
            $scope.allRules = data[0];
            $scope.allBadges = data[1];
            $scope.allEventType = data[2];
            var i, j;
            for (j in $scope.allRules) {
                var newBadge = $scope.allBadges.filter(function (data2) {
                    return data2.badge_id === $scope.allRules[j].badge_id;

                });
                $scope.allRules[j].badgeName = newBadge[0].name;

                for (i in $scope.allRules[j].event_types) {
                    var newEvent = $scope.allEventType.filter(function (data3) {
                        return data3.type_id === $scope.allRules[j].event_types[i].event_type;
                    });
                    $scope.allRules[j].event_types[i].name = newEvent[0].name;
                }
            }

        });

    $scope.modify = function (rule) {
        $location.path('/' + $routeParams.appid + '/rule/' + rule.rule_id);
    };

    $scope.create = function () {
        $location.path('/' + $routeParams.appid + '/rule/create');
    };
    $scope.delete = function (rule) {
        Rules.remove({appId: $routeParams.appid, ruleId: rule.rule_id});
        $location.path('/' + $routeParams.appid + '/rule');
    };

}

function RuleCreateCtrl($routeParams, $scope, $location, Rules, EventsTypes, Badges) {
    $scope.allThreshold = [
        {}
    ];
    $scope.rule = Rules.get({appId: $routeParams.appid, ruleId: 0});
    $scope.allBadges = Badges.query({appId: $routeParams.appid});
    $scope.allEventTypes = EventsTypes.query({appId: $routeParams.appid});
    $scope.create = function (rule) {
        var cleanArray = [];
        for (var i in $scope.allThreshold) {
            cleanArray.push({threshold:$scope.allThreshold[i].threshold, event_type:$scope.allThreshold[i].event_type});
        }
        rule.event_types = cleanArray;
        rule.badge_id = $scope.badge.badge_id;
        rule.$create({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/rule');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/rule');
    };
}


function RuleModifyCtrl($routeParams, $scope, $location, Rules, Badges, EventsTypes, $q) {
    function eventsTypesQuery() {
        var d = $q.defer();
        var res = EventsTypes.query({appId: $routeParams.appid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }

    function badgeQuery() {
        var d = $q.defer();
        var res = Badges.query({appId: $routeParams.appid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }
    function ruleQuery() {
        var d = $q.defer();
        var res = Rules.get({appId: $routeParams.appid, ruleId: $routeParams.ruleid},
            function () {
                d.resolve(res);
            }
        );
        return d.promise;
    }

    $q.all([
            ruleQuery(),
            badgeQuery(),
            eventsTypesQuery()
        ]).
        then(function (data) {
            $scope.rule = data[0];
            $scope.allBadges = data[1];
            $scope.allEventTypes = data[2];


            $scope.allThreshold = $scope.rule.event_types;
            var i;
            for (i in $scope.rule.event_types) {
                var newVal = $scope.allEventTypes.filter(function (data1) {
                    return data1.type_id === $scope.rule.event_types[i].event_type;
                });

                $scope.allThreshold[i].name = newVal[0].name;
            }
            var newBadge = $scope.allBadges.filter(function (data2) {
                return data2.badge_id === $scope.rule.badge_id;
            });
            $scope.badge = newBadge[0];

        });

    $scope.modify = function (rule) {
        var cleanArray = [];
        for (var i in $scope.allThreshold) {
            cleanArray.push({threshold:$scope.allThreshold[i].threshold, event_type:$scope.allThreshold[i].event_type});
        }
        rule.event_types = cleanArray;
        rule.badge_id = $scope.badge.badge_id;
        rule.$update({appId: $routeParams.appid, ruleId: rule.rule_id});
        $location.path('/' + $routeParams.appid + '/rule');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/rule');
    };

}


/**
 * Leaderboard controller
 * @param $scope
 * @param Leaderboard
 * @constructor
 */
function HomeCtrl($routeParams, $scope, Leaderboard, $rootScope) {
    $rootScope.appid = $routeParams.appid;
    $scope.leaderboard = Leaderboard.query({appId: $routeParams.appid});
}

/**
 * User main controller
 * @param $scope
 * @param $location
 * @param Users
 * @constructor
 */
function UserCtrl($routeParams, $scope, $location, Users) {
    $scope.allUsers = Users.query({appId: $routeParams.appid});

    $scope.modify = function (user) {
        $location.path('/' + $routeParams.appid + '/user/' + user.user_id);
    };
    $scope.detail = function (user) {
        $location.path('/' + $routeParams.appid + '/user/detail/' + user.user_id);
    };
    $scope.delete = function (user) {
        Users.remove({appId: $routeParams.appid, userId: user.user_id});
        $location.path('/' + $routeParams.appid + '/user');
    };
    $scope.create = function () {
        $location.path('/' + $routeParams.appid + '/user/create');
    };

}

/**
 * User modification controller
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param Users
 * @constructor
 */
function UserModifyCtrl($routeParams, $scope, $location, Users) {
    $scope.user = Users.get({appId: $routeParams.appid, userId: $routeParams.userid});

    $scope.update = function (user) {
        user.$update({appId: $routeParams.appid, userId: user.user_id});
        $location.path('/' + $routeParams.appid + '/user');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/user');
    };
}

/**
 * User detail controller
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param Users
 * @constructor
 */
function UserDetailCtrl($routeParams, $scope, $location, Users) {
    $scope.user = Users.get({appId: $routeParams.appid, userId: $routeParams.userid});
    $scope.badges = Users.get({appId: $routeParams.appid, userId: $routeParams.userid, badge: 'badges'});

    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/user');
    };
}

/**
 * User creation controller
 * @param $scope
 * @param $location
 * @param Users
 * @constructor
 */
function UserCreateCtrl($routeParams, $scope, $location, Users) {
    //why need to add the following line for
    $scope.user = Users.get({appId: $routeParams.appid, userId: 0});
    $scope.create = function (user) {
        user.$create({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/user');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/user');
    };
}


