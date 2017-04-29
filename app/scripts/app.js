(() => {
    'use strict';
    angular.module('app', [
        'ui.router',
        'app.core',
        'dndLists',
        'app.layout',
        'app.data',
        'app.file',
        'app.canv'
    ]);
})();