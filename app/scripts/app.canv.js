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

            timeout(() => {
                this.tempUser = this.mydata
            })

        }

        return {
            bindings: {
                mydata: '='
            },
            template: TEMPLATE(),
            controller: componentController,
            controllerAs: 'vm'
        }
    }

    function TEMPLATE() {
        return TEMPLATE = `
                <div class="block">
                      <div class="row">
                            <div ng-repeat="item in vm.tempUser.images track by $index" 
                            class="col-xs-2 col-md-2" ng-show="item.src.length>0">
                            <div class="inner-w p5" >
                                    <a href="#" class="thumbnail">
                                    <img ng-src="{{item.src}}" ng-if="item.src.length>0" />                       
                                    </a>
                                </div>
                            </div>
                       </div> 
                       <div class="row">
                       <div ng-repeat="item in vm.tempUser.text track by $index" class="col-xs-2 col-md-2" >
                           <div class="alert alert-info">
                                <strong>{{item.name}}</strong>
                            </div>
                       </div>
                    
                </div>`;
    }
})();