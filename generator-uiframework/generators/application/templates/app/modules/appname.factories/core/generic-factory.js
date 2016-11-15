/**
 * User Model to fetch the user details. It is used to check if the user has a particular role or not.<br>
 * It is also used to check the visibility of a button/link/tab depending upon the role of the user.
 */

(function () {
    'use strict';

    angular.module('appname.factories.core', []).factory('coreGenericFactory', genericFunctions);
    genericFunctions.$inject = ['$location'];

    function genericFunctions($location) {
        var genericFunction = {};

        genericFunction.isLocal = function () {
            var isLocal = false;
            var regex_local = /(?:127\.0\.0\.1|localhost)/;
            if (regex_local.test($location.host())) {
                isLocal = true;
            }
            return isLocal;
        };

        return genericFunction;
    }
})();
