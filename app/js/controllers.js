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
function BadgeCtrl($routeParams, $scope, $location, Badges, Category) {
    $scope.allBadges = Badges.query({appId: $routeParams.appid});
    $scope.allCategories = Category.query({appId: $routeParams.appid},
        function (data) {
            var i;
            for (i in $scope.allBadges) {
                var newVal = data.filter(function (data) {
                    return data.category_id === $scope.allBadges[i].category_id;
                });
                $scope.allBadges[i].categoryName = newVal[0].name;
            }
        });
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
 * @param Category
 * @constructor
 */
function BadgeModifyCtrl($routeParams, $scope, $location, Badges, Category) {
    $scope.badge = Badges.get({appId: $routeParams.appid, badgeId: $routeParams.badgeid});
    $scope.allCategories = Category.query({appId: $routeParams.appid},
        function (data) {

            var newVal = data.filter(function (data) {
                return data.category_id === $scope.badge.category_id;
            });
            $scope.categorySelected = newVal[0];
            $scope.categorySelected.name = newVal[0].name;
            // $scope.categorySelected = Category.get({appId: $routeParams.appid, categoryId: $scope.badge.category_id});
        },
        function (err) {
        });


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
 * @param Category
 * @constructor
 */
function BadgeCreateCtrl($routeParams, $scope, $location, Badges, Category) {
    //why need to add the following line for
    $scope.badge = Badges.get({appId: $routeParams.appid, badgeId: 0});
    $scope.allCategories = Category.query({appId: $routeParams.appid});
    $scope.newCategory = Category.get({appId: $routeParams.appid, categoryId: 0});

    $scope.create = function (badge) {
        badge.category_id = $scope.category.category_id;
        badge.$create({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/badge');
    };
    $scope.cancel = function () {
        $location.path('/' + $routeParams.appid + '/badge');
    };
    $scope.createCategory = function (newCategory) {

        newCategory.$create({appId: $routeParams.appid});
        $scope.allCategories = Category.query({appId: $routeParams.appid});
        $location.path('/' + $routeParams.appid + '/badge/create');

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
function RuleCtrl($routeParams, $scope, $location, Rules, Badges, EventsTypes) {
    $scope.allRules = Rules.query({appId: $routeParams.appid});
    $scope.allBadges = Badges.query({appId: $routeParams.appid},
        function (data) {
            var i;
            for (i in $scope.allRules) {
                var newVal = data.filter(function (data) {
                    return data.badge_id === $scope.allRules[i].badge;
                });
                $scope.allRules[i].badgeName = newVal[0].name;
            }
        });
    $scope.allEventType = EventsTypes.query({appId: $routeParams.appid},
        function (data) {
            var i, j;
            for (j in $scope.allRules) {
                for (i in $scope.allRules[j].event_types) {
                    //
                    var newVal = data.filter(function (data) {
                        return data.type_id === $scope.allRules[j].event_types[i].event_type;
                    });
                    $scope.allRules[j].event_types[i].name = newVal[0].name;
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
        Rules.remove({appId: $routeParams.appid, userId: rule.rule_id});
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
        var i, cleanArray = [
            {}
        ];
        for (i in $scope.allThreshold) {
            cleanArray[i].threshold = $scope.allThreshold[i].threshold;
            cleanArray[i].event_type = $scope.allThreshold[i].event_type.type_id;
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


function RuleModifyCtrl($routeParams, $scope, $location, Rules, Badges, EventsTypes) {
    $scope.rule = Rules.get({appId: $routeParams.appid, ruleId: $routeParams.ruleid},
        function (data) {
            $scope.allThreshold = $scope.rule.event_types;
        },
        function (err) {
        });

    $scope.allEventTypes = EventsTypes.query({appId: $routeParams.appid});
    $scope.allEventType = EventsTypes.query({appId: $routeParams.appid},
        function (data) {
            var i;
            for (i in $scope.rule.event_types) {
                //
                var newVal = data.filter(function (data) {
                    return data.type_id === $scope.rule.event_types[i].event_type;
                });
                $scope.allThreshold[i].name = newVal[0].name;
                console.log(newVal[0]);
            }
        });


    $scope.allBadges = Badges.query({appId: $routeParams.appid},
        function (data) {
            var newVal = data.filter(function (data) {
                return data.badge_id === $scope.rule.badge;
            });
            $scope.badge = newVal[0];
            $scope.badge.name = newVal[0].name;
        },
        function (err) {
        });


    $scope.modify = function (rule) {
        var i, cleanArray = [
            {}
        ];
        for (i in $scope.allThreshold) {
            cleanArray[i].threshold = $scope.allThreshold[i].threshold;
            cleanArray[i].event_type = $scope.allThreshold[i].event_type.type_id;
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
    //TODO i remove the appId in the query. Goal is to not manage applicationId in the ctrl, but in the services
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


