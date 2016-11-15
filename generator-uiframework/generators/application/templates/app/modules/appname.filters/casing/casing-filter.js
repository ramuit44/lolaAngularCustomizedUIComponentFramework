/**
 * User Model to fetch the user details. It is used to check if the user has a particular role or not.<br>
 * It is also used to check the visibility of a button/link/tab depending upon the role of the user.
 */

(function () {
    'use strict';

    angular.module('appname.filters.casing').filter('appnameTitleCase', TitleCase);

    TitleCase.$inject = [];

    function TitleCase() {
        var filter = function (input) {
            if (!input) {
                return null;
            } else {
                var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

                input = input.toLowerCase();
                return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
                    if (index > 0 && index + match.length !== title.length &&
                        match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                        title.charAt(index - 1).search(/[^\s-]/) < 0) {
                        return match.toLowerCase();
                    }

                    if (match.substr(1).search(/[A-Z]|\../) > -1) {
                        return match;
                    }

                    return match.charAt(0).toUpperCase() + match.substr(1);
                });
            }
        };

        return filter;
    }

})();
