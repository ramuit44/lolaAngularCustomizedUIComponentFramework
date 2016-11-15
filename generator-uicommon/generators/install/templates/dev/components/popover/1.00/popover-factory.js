/*
 * Popover factory to display the a modal.
 */
(function () {
    'use strict';

    angular.module('appname.common.popover').factory('popoverFactory', Popover);

    Popover.$inject = ['$timeout'];

    function Popover($timeout) {
        Popover.popovers = {};
        var popoverArray = [];

        $(document).click(function (e) {
            $timeout(function () {
                for (var index = 0; index < popoverArray.length; index++) {
                    Popover.popovers[popoverArray[index]] = false;
                }
                popoverArray = [];
            });
        });

        Popover.toggle = function (popoverName) {
            if (Popover.popovers[popoverName]) {
                var index = popoverArray.indexOf(popoverName);
                popoverArray.splice(index, 1);
                Popover.popovers[popoverName] = !Popover.popovers[popoverName];
            } else {
                popoverArray.push(popoverName);
                Popover.popovers[popoverName] = !Popover.popovers[popoverName];
            }
        };

        return Popover;
    }
})();
