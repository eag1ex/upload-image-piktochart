(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA', '$scope', '$timeout', 'mylocalStorage'];

    function LayoutController(DATA, scope, timeout, mylocalStorage) {
        var s = scope;
        console.log('mylocalStorage', mylocalStorage);

        DATA.get().then((data) => {
            s.images = data.images;
            s.user = data.user;
        })

        //// WATCH FOR DATA CHANGES AND UPDATE LOCAL STORAGE
        scope.$watch('user', (newVal, oldVal) => {
            console.log('newVal, oldVal', newVal, oldVal);
            //mylocalStorage.set(userID, user);
        }, true);



        /**
         * waiting for directive "formUpload" to upload image
         * then we refresh the data from server
         */
        scope.$on("updateDB", (evt, data) => {
            console.log('data changed!');
            DATA.get().then((data) => {
                s.images = data.images;
            })
        });


        this.addToImage = function(img) {
            if (!img) return;
            var hasImage = false;
            angular.forEach(s.user.images, (value, key) => {

                if (value.src == img) {
                    console.log('has image!')
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