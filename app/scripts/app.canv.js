(() => {
    'use strict';

    angular
        .module('app.canv', []);
    angular
        .module('app.canv')
        .component('canv', component());


    function component() {

        componentController['$inject'] = ['$timeout']

        function componentController(timeout) {
            this.tempUser = null;
            this.tempImages = null;

            timeout(() => {
                console.log('this.mydata.user', this.mydata)
                this.tempText = this.mydata.text
                this.tempImages = this.mydata.images
            })
        }

        return {
            bindings: {
                mydata: '='
            },
            templateUrl: "./app/scripts/app.canv.html",
            controller: componentController,
            controllerAs: 'vm'
        }
    }
})();