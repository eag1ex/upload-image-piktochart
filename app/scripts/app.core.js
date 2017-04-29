(() => {
    'use strict';
    angular.module('app.core', []);

    angular
        .module('app.core')
        .config(configureStates)
        .run(appRun)
        .constant('API', { 'UPLOADS': 'http://localhost:8000/uploads', 'IMAGES': 'http://localhost:8000/images' })

    appRun['$inject'] = ['$rootScope'];

    function appRun($rootScope) {
        $rootScope.$on("$stateChangeSuccess", function() {
            console.log('angular Loaded');
        });
    }

    configureStates['$inject'] = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function configureStates($stateProvider, $locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        var states = getStates();
        states.forEach(function(state) {
            console.log('state> ', state.state)
            $stateProvider.state(state.state, state.config);
        });
    }

    function getStates() {

        return [{
            state: 'main',
            config: {
                url: '/',
                templateUrl: './app/scripts/app.layout.html',
                title: 'main'
            }
        }];
    }
})();