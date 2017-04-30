(() => {
    'use strict';
    angular.module('app', [
        'ui.router',

        'app.core', // main settings and config
        'dndLists', // draggins plugin
        'app.layout', // main controller  'LayoutController'
        'app.data', // 'DATA' SERVICE
        'app.localStorage', // 'localstorage' service
        'app.file', // 'formUpload' directive
        'app.canv' // 'canv' directive
    ]);
})();