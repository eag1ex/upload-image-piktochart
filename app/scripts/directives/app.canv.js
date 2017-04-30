(() => {
    'use strict';

    angular
        .module('app.canv', []);
    angular
        .module('app.canv')
        .component('canv', component());
    /**
     *  <canv mydata='user'></canv>
     *  all elements are being added to this canvas
     *  and can be manipulated from here
     *  Data is shared via "mydata"
     * any changes are automaticly updated to layout controller via $watch
     */

    function component() {

        componentController['$inject'] = ['$timeout', ]

        function componentController(timeout) {
            this.tempUser = null;
            this.tempImages = null;
            this.mydata = null;

            this.$onChanges = function(changes) {
                if (angular.isUndefined(changes.mydata.previousValue) &&
                    angular.isDefined(changes.mydata.currentValue)) {
                    this.mydata = changes.mydata.currentValue;
                    this.tempText = this.mydata.text
                    this.tempImages = this.mydata.images
                }
            }


            this.removeText = (i) => {
                if (typeof(i) !== 'number') return;
                this.tempText.splice(i, 1);
            }

            this.removeImage = (i) => {
                if (typeof(i) !== 'number') return;
                this.tempImages.splice(i, 1);
            }
        }

        return {
            bindings: {
                mydata: '<'
            },
            templateUrl: "./app/scripts/directives/app.canv.html",
            controller: componentController,
            controllerAs: 'vm'
        }
    }
})();