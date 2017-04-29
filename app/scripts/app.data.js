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

            return $q.all([this.images(), this.user()]).then((result) => {
                return {
                    images: result[0],
                    user: result[1]
                };
            });

        }
        this.user = function() {

            var user = {
                id: 0,
                images: [{ name: 'image', src: '' }],
                text: [{ name: 'some description' }]
            }
            var deferred = $q.defer();

            if (user) deferred.resolve(user);
            else deferred.reject('error data not found');
            return deferred.promise;
        }

        this.images = function() {
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