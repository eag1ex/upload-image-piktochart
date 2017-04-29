(() => {
    'use strict';
    angular.module('app.localStorage', []);
    angular
        .module('app.localStorage')
        .service('mylocalStorage', Service);

    Service['$inject'] = ['localstorage', '$state', '$q'];

    function Service(localstorage, state, q) {

        this.set = (key, data) => {
            console.log('data saved!')
            localstorage.setItem(key, JSON.stringify(data));
        }

        this.get = (key) => {
            var deferred = q.defer();
            var localData = localstorage.getItem(key);

            if (localData !== null) {
                console.log('got local data');
                deferred.resolve(angular.fromJson(localData));

            } else {
                deferred.reject('error data');
            }
            return deferred.promise;
        }

        this.removeItem = (key) => {
            localstorage.removeItem(key);
        }

        this.clearAll = () => {
            localstorage.clear()
        }
    }
})();