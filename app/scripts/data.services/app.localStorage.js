(() => {
    'use strict';
    angular.module('app.localStorage', []);
    angular
        .module('app.localStorage')
        .service('mylocalStorage', Service);

    Service['$inject'] = ['localstorage', '$state', '$q', '$rootScope'];

    /**
     * 
     * @param {*} localstorage 
     * @param {*} state 
     * @param {*} q 
     * @param {*} rootScope 
     *  
     * local storage > window.localstorage, no plugin
     * this checks is new data is available via 'get' and 'set'
     * it is integraded in app.data "DATA" service
     * 
     */

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
                deferred.resolve(angular.fromJson(localData));

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
            localstorage.clear();
            localstorage.clear();
        }
    }
})();