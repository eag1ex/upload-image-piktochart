(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA'];

    function LayoutController(DATA) {
        var vm = this;
        console.log('data', DATA.get())
        DATA.get().then((data) => {
            console.log('data1', data)
            this.images = data;
        })

        this.test = '??????'

    }
})();