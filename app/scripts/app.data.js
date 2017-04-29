(() => {
    'use strict';
    angular
        .module('app.data', [])
    angular
        .module('app.data')
        .service('DATA', Service)

    Service['$inject'] = ['$http', '$q', 'API'];

    function Service($http, $q, API) {

        this.get = function() {
            return $http.get(API.IMAGES)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return $q.reject(error);
                });
        }
    }

})();