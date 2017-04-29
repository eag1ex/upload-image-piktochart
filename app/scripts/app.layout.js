(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA', '$scope'];

    function LayoutController(DATA, scope) {

        this.dataOn = function() {
            DATA.get().then((data) => {
                this.images = data.images;
                this.user = data.user;
            })
        }

        this.dataOn();

        scope.$on("updateDB", (evt, data) => {
            console.log('data changed!');
            this.dataOn();
        });


        this.addToImage = function(img) {
            if (!img) return;
            var hasImage = false;
            angular.forEach(this.user.images, (value, key) => {

                if (value.src == img) {
                    //   console.log('has image!')
                    hasImage = true;
                    return;
                }
            });
            if (!hasImage) this.user.images.unshift({ src: img });
        }

        this.addToText = function() {
            // console.log('this.user.text', this.user.text)
            if (!this.addText) return;
            var hasText = false;
            angular.forEach(this.user.text, (value, key) => {
                if (value.name == this.addText) {
                    //  console.log('has text!')
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