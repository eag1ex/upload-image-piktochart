(() => {
    'use strict';
    angular
        .module('app.file', [])
    angular
        .module('app.file')
        .directive('formUpload', ['API', directive]);

    function directive(API) {

        function directiveController() {
            console.log('directive loaded?')
        }

        function link(scope, el, attrs) {
            el.bind('change', (event) => {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                console.log('file?', file)
                scope.$apply();
            });

            scope.uploadFile = () => {
                uploadFile(el, API);
            }
        }


        function uploadFile(el, API) {
            var fileForm = el[0].firstChild;
            console.log('file', fileForm)
            $.ajax({
                url: API.UPLOADS,
                type: "POST",
                data: new FormData(fileForm),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    console.log('success', data)
                    return false;
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                    return false;
                }
            });
            return false;

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

        return `<form id="fileForm" name="form" method="post" ng-submit='uploadFile()'>
            <h3>Form</h3>
            <input ng-model="file" name="upload" type="file" accept="image/*" />
            <input ng-show="file.toString().length>0" type="submit" value="Upload Image">
        </form>`;
    }
})();