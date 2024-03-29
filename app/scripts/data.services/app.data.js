(() => {
    'use strict';
    angular
        .module('app.data', [])
    angular
        .module('app.data')
        .service('DATA', Service)

    Service['$inject'] = ['$http', '$q', 'API', 'mylocalStorage'];

    /**
     * 
     * @param {*} http 
     * @param {*} q 
     * @param {*} API 
     * @param {*} mylocalStorage 
     * 
     *  using object data with local storage integraded 'mylocalStorage'
     *  it checks for 'localData' user>localData, if not found it runs >user>cleanNew
     * 
     */


    function Service($http, $q, API, mylocalStorage) {

        this.get = function() {

            return $q.all([this.images(), this.user()]).then((result) => {
                return {
                    images: result[0],
                    user: result[1]
                };
            });

        }
        this.user = function() {

            ////////////////////////////////////     
            /// LOCAL DATA
            var localData = mylocalStorage.get();

            if (localData !== null) {
                return localData.then((data) => {
                    return data;
                }, (error) => {
                    return cleanNew();
                })
            }
            ////////////////////////////////////

            function cleanNew() {
                var user = {
                    id: 0,
                    images: [{ id: 0, name: 'image', src: '' }],
                    text: [{ id: 0, name: 'Pictochart, create text editor' }]
                }
                var deferred = $q.defer();

                if (user) {
                    /// SET LOCAL STORAGE
                    mylocalStorage.set(user);

                    console.info('running clean from DB');
                    deferred.resolve(user);

                } else {
                    deferred.reject('error data not found');
                }
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