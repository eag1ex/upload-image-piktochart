(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA', '$scope', '$timeout', 'mylocalStorage', '$rootScope'];

    function LayoutController(DATA, scope, timeout, mylocalStorage) {
        var s = scope;

        ///////////////////////////////////////
        /// reset/clear cache
        mylocalStorage.clearAll();

        DATA.get().then((data) => {
            s.images = data.images;
            s.user = data.user;
        })

        //// WATCH FOR DATA CHANGES AND UPDATE LOCAL STORAGE
        scope.$watch('user', (newVal, oldVal) => {
            if (typeof(newVal) !== 'undefined' && typeof(newVal) !== null) {
                console.info('updated cache!');
                mylocalStorage.set(newVal);
            }
        }, true);



        /**
         * waiting for directive "formUpload" to upload image
         * then we refresh the data from server
         */
        scope.$on("updateDB", (evt, data) => {

            DATA.get().then((data) => {
                s.images = data.images;
                console.info('updated model data!');
            })
        });


        this.addToImage = function(img) {
            if (!img) return;
            var hasImage = false;
            angular.forEach(s.user.images, (value, key) => {

                if (value.src == img) {
                    hasImage = true;
                    return;
                }
            });
            if (!hasImage) {
                s.user.images.unshift({ src: img });
            }
        }

        this.addToText = () => {
            if (!this.addText) return false;
            var hasText = false;
            angular.forEach(s.user.text, (value, key) => {
                if (value.name === this.addText) {
                    hasText = true;
                    return;
                }
            });
            if (!hasText) {
                s.user.text.unshift({ name: this.addText });
                this.addText = '';
            }
        }

    }
})();