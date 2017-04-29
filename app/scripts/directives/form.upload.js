(() => {
    'use strict';
    angular
        .module('app.file', [])
    angular
        .module('app.file')
        .directive('formUpload', ['API', 'DATA', '$timeout', directive]);

    function directive(API, DATA, timeout) {

        function directiveController() {
            this.dbUpdated = false;
            console.log('directive loaded?')
        }

        function link(scope, el, attrs) {
            el.bind('change', (event) => {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                console.log('file?', file)
                scope.$apply();
            });
            timeout(() => {
                console.log('scope.$parent', scope.$parent)
            }, 100)


            this.updateDB = () => {

                scope.$emit("updateDB", { data: true });

            }



            scope.uploadFile = () => {
                var fileForm = el[0].firstChild;
                $.ajax({
                    url: API.UPLOADS,
                    type: "POST",
                    data: new FormData(fileForm),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: (data) => {
                        console.log('success', data)
                        this.updateDB();
                        scope.file = '';
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

        return `<form id="fileForm" name="form" method="post" ng-submit='uploadFile(file)'>
            <h3>Form</h3>
              <div class="openfile-group">
              <input ng-model="file" name="upload" type="file" accept="image/*" 
              class=" float-left btn btn-danger btn-md" />
              <button type="submit" class="btn btn-danger btn-md">Choose file</button>
              </div>
             <p class="bg-success" ng-show="file.toString().length>0">{{file.name}}</p> 
            <button ng-show="file.toString().length>0" type="submit" class="btn btn-primary btn-md">Upload</button>
        </form>`;
    }
})();