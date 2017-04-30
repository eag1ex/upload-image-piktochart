(() => {
    'use strict';
    angular
        .module('app.file', [])
    angular
        .module('app.file')
        .directive('formUpload', ['API', 'DATA', '$timeout', directive]);
    /**
     * 
     * @param {*} API 
     * @param {*} DATA 
     * @param {*} timeout 
     * 
     * This directive uploads image to the server and send an $emit 
     *  signal to the main controller to update scope
     * 
     * <form-upload></form-upload>
     * scope.file >  we access file information for manipulation
     */


    function directive(API, DATA, timeout) {

        function directiveController() {}

        function link(scope, el, attrs) {
            el.bind('change', (event) => {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
            this.updateDB = () => {
                scope.$emit("updateDB", { data: true });
            }
            scope.fileLoading = false;

            scope.uploadFile = () => {
                scope.fileLoading = true;
                var fileForm = el[0].firstChild;
                $.ajax({
                    url: API.UPLOADS,
                    type: "POST",
                    data: new FormData(fileForm),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: (data) => {
                        // console.log('success', data)
                        this.updateDB();
                        scope.file = '';
                        scope.fileLoading = false;
                        return false;
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.log(xhr.status);
                        console.log(thrownError);
                        return false;
                    }
                });
                return false;
            }

        }

        return {
            controller: directiveController,
            link: link,
            template: TEMPLATE(),
            controllerAs: 'vm',
            restrict: 'E',

        }
    }

    function TEMPLATE() {

        return `<form id="fileForm" name="form" method="post" ng-submit='uploadFile(file);'>
            <h3>Form</h3>
              <div class="openfile-group">
              <input ng-model="file" name="upload" type="file" accept="image/*" 
              class=" float-left btn btn-danger btn-md" />
              <button type="submit" class="btn btn-danger btn-md">Choose file</button>
              <span id="preload-icon"ng-show="fileLoading==true"></span>
              </div>
             <p class="bg-success" ng-show="file.toString().length>0">{{file.name}}</p> 
            <button ng-show="file.toString().length>0" type="submit" class="btn btn-primary btn-md">Upload</button>
        </form>`;
    }
})();