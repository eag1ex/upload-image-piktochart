(() => {
    'use strict';
    angular
        .module('app.data', [])
    angular
        .module('app.data')
        .service('DATA', Service)

    Service['$inject'] = ['$http', '$q', 'API', 'mylocalStorage'];

    function Service($http, $q, API, mylocalStorage) {

        var userID = 0;
        this.get = function() {

            return $q.all([this.images(), this.user()]).then((result) => {
                return {
                    images: result[0],
                    user: result[1]
                };
            });

        }
        this.user = function() {
            return cleanNew();
            ////////////////////////////////////     
            /// LOCAL DATA
            /*
            var localData = mylocalStorage.get(userID);
            console.log('localData', localData)
            if (localData) {
                return localData.then((response) => {
                    console.log('running localdata', response)
                    return response.data;
                }, (error) => {
                    return cleanNew();
                })
            }
            */

            ////////////////////////////////////
            function cleanNew() {
                var user = {
                    id: 0,
                    images: [{ name: 'image', src: '' }],
                    text: [{ name: 'some description' }]
                }
                var deferred = $q.defer();

                if (user) {
                    /// AQUIRE LOCAL DATA
                    mylocalStorage.set(userID, user);
                    deferred.resolve(user);
                } else deferred.reject('error data not found');
                return deferred.promise;
            }
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