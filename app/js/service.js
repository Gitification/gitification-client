/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors    :    Vincent Pasquier, Vincent Grivel
 *                        Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :    Implementation of the services that manage the resources
 *
 *********************************************************/

'use strict';

var api = 'http://localhost\\:8080/';

angular.module('gamificationServices', ['ngResource'], function ($provide) {
    $provide.factory('Users', function ($resource) {
        return $resource(api + '/applications/:appId/users/:userId/:badge', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                userId: '@userId'
            },
            getBadge: {
                method: 'GET',
                isArray: true,
                userId: '@userId',
                badge: '@badge'
            },
            remove: {
                method: 'DELETE',
                userId: '@userId'
            },
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                userId: '@userId'
            }

        });
    });

    $provide.factory('Badges', function ($resource) {
        return $resource(api + '/applications/:appId/badges/:badgeId', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                badgeId: '@badgeId'
            },
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                badgeId: '@badgeId'
            }

        });
    });

    $provide.factory('Category', function ($resource) {
        return $resource(api + '/applications/:appId/badges/categories/:categoryId', {
                appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                categoryId: '@categoryId'
            },
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                categoryId: '@categoryId'
            }

        });
    });

    $provide.factory('Rules', function ($resource) {
        return $resource(api + '/applications/:appId/rules/:ruleId', {
                appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                ruleId: '@ruleId'
            },
            remove: {
                method: 'DELETE',
                ruleId: '@ruleId'
            },
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                ruleId: '@ruleId'
            }

        });
    });

    $provide.factory('Events', function ($resource) {
        return $resource(api + 'applications/:appId/events/:eventId', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                eventId: '@eventId'
            }
        });
    });

    $provide.factory('EventsTypes', function ($resource) {
        return $resource(api + 'applications/:appId/events/types/:typeId', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                typeId: '@typeId'
            },
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                ruleId: '@typeId'
            }
        });
    });
    $provide.factory('Leaderboard', function ($resource) {
        return $resource(api + '/applications/:appId/leaderboard', {
            appId: '@appId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    });
    $provide.factory('Applications', function ($resource) {
        return $resource(api + '/applications/:appId', { }, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },
            get: {
                method: 'GET',
                typeId: '@appId'
            }
        });
    });
});
