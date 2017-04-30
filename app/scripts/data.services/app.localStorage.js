(() => {
    'use strict';
    angular.module('app.localStorage', []);
    angular
        .module('app.localStorage')
        .service('mylocalStorage', Service);

    Service['$inject'] = ['localstorage', '$state', '$q', '$rootScope'];

    function Service(localstorage, state, q, rootScope) {

        var userID = rootScope.userID || 'pictochart';

        this.set = (data) => {
            localstorage.setItem(userID, JSON.stringify(data));
        }

        this.get = () => {
            var deferred = q.defer();
            var localData = localstorage.getItem(userID);

            if (localData !== undefined && localData !== null) {
                console.info('running localdata!')
                deferred.resolve(JSON.parse(localData));

            } else {
                deferred.reject(null)
            }
            return deferred.promise;
        }

        this.removeItem = () => {
            localstorage.removeItem(userID);
        }

        this.clearAll = () => {
            console.info('cleaned local data with clearAll() !')
            localstorage.clear()
        }
    }
})();