(() => {
    'use strict';

    angular
        .module('app')
        .controller('Maincontroller', Maincontroller);

    //Maincontroller.inject = ['dependency1'];

    function Maincontroller() {
        var vm = this;
        console.log('Maincontroller')

    }
})();