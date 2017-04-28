(() => {
    'use strict';

    angular
        .module('app.canv', []);
    angular
        .module('app.canv')
        .component('canv', component());


    function component() {

        function componentController() {

            this.myTest = 'hello test';

            console.log('canvs loaded?')

        }

        return {
            bindings: {},
            template: TEMPLATE(),
            controller: componentController,
            controllerAs: 'vm'
        }
    }


    function TEMPLATE() {
        return TEMPLATE = `
            <div class="canvas col-sm-8 col-md-8 col-lg-8">
                <div class="block">
                {{vm.myTest}}
                    <!-- Add images and texts to here -->
                </div>
            </div>`;
    }
})();