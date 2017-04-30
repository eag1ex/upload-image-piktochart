(() => {
    'use strict';
    angular.module('app.core', []);

    angular
        .module('app.core')
        .config(configureStates)
        .run(appRun)
        .filter('unique', uniqueFilter)
        .constant('API', { 'UPLOADS': 'http://localhost:8000/uploads', 'IMAGES': 'http://localhost:8000/images' })
        .constant('localstorage', window.localStorage);

    appRun['$inject'] = ['$rootScope'];

    function appRun($rootScope) {
        $rootScope.userID = 'pictochart';

        $rootScope.$on("$stateChangeSuccess", function() {
            console.info('angular Loaded');
        });
    }

    configureStates['$inject'] = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function configureStates($stateProvider, $locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        var states = getStates();
        states.forEach(function(state) {
            console.info('state> ', state.state)
            $stateProvider.state(state.state, state.config);
        });
    }

    function getStates() {
        return [{
            state: 'main',
            config: {
                url: '/',
                controller: 'LayoutController',
                controllerAs: 'main',
                templateUrl: './app/scripts/app.layout.html',
                title: 'main'
            }
        }];
    }

    function uniqueFilter() {
        return function(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    }

})();