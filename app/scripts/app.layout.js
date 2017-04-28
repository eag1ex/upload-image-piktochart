(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    // LayoutController.inject = ['dependency1'];
    function LayoutController() {
        var vm = this;
        console.log('LayoutController')

    }
})();