(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA', '$scope', '$timeout'];

    function LayoutController(DATA, scope, timeout) {


        DATA.get().then((data) => {
            this.images = data.images;
            this.user = data.user;
        })


        /**
         * waiting for directive "formUpload" to upload image
         * then we refresh the data from server
         */
        scope.$on("updateDB", (evt, data) => {
            console.log('data changed!');
            DATA.get().then((data) => {
                this.images = data.images;
            })
        });


        this.addToImage = function(img) {

            if (!img) return;
            var hasImage = false;
            angular.forEach(this.user.images, (value, key) => {

                if (value.src == img) {
                    console.log('has image!')
                    hasImage = true;
                    return;
                }
            });
            if (!hasImage) this.user.images.unshift({ src: img });
        }

        this.addToText = () => {
            if (!this.addText) return false;
            var hasText = false;
            angular.forEach(this.user.text, (value, key) => {
                if (value.name === this.addText) {
                    hasText = true;
                    return;
                }
            });
            if (!hasText) {
                this.user.text.unshift({ name: this.addText });
                this.addText = '';
            }
        }


    }
})();