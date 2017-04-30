(() => {
    'use strict';
    angular.module('app.layout', []);
    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    LayoutController['$inject'] = ['DATA', '$scope', '$timeout', 'mylocalStorage', '$rootScope'];

    /**
     * @param {*} DATA 
     * @param {*} scope 
     * @param {*} timeout 
     * @param {*} mylocalStorage 
     * 
     * data flow starts from this controller and gets distributed to  "canv" component/directive
     * 
     */


    function LayoutController(DATA, scope, timeout, mylocalStorage) {
        var s = scope;

        ///////////////////////////////////////
        /// reset/clear cache
        //mylocalStorage.clearAll();

        DATA.get().then((data) => {
            s.images = data.images;
            s.user = data.user;
            console.log('s.user', s.user)

        })

        scope.$on("$viewContentLoaded", function() {
            //// WATCH FOR DATA CHANGES AND UPDATE LOCAL STORAGE
            scope.$watch('user', (newVal, oldVal) => {
                if (typeof(newVal) !== 'undefined' && typeof(newVal) !== null) {
                    // delay cache update      
                    timeout(() => {
                        mylocalStorage.set(newVal);
                        console.info('updated cache!');
                    }, 500);
                    //
                }
            }, true);
        });



        /**
         * waiting for directive "formUpload" to upload image
         * then we refresh the data from server
         */
        scope.$on("updateDB", (evt, data) => {

            DATA.get().then((data) => {
                s.images = data.images;
                mylocalStorage.set(s.user);
                console.info('updated model data!');
            })
        });


        this.addToImage = function(img) {
            if (!img) return false;
            var hasImage = false;
            angular.forEach(s.user.images, (value, key) => {

                if (value.src == img) {
                    hasImage = true;
                    return;
                }
            });
            if (!hasImage) {
                var newID = s.user.images.length;
                s.user.images.unshift({ id: newID, src: img });

            }
            return true;
        }

        this.removeImage = function(i) {
            if (typeof(i) !== 'number') return;
            s.images.splice(i, 1);
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
                var newID = s.user.text.length;
                s.user.text.unshift({ id: newID, name: this.addText });
                this.addText = '';
            }
        }

    }
})();