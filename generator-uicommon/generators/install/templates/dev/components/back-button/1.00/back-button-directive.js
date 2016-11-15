(function appnameBackButtonDirective() {
    'use strict';
    angular.module('appname.common.backButton').directive('appnameBackButton', BackButton);

    BackButton.$inject = [];

    function BackButton() {
        var directive = {
            restrict: 'EA',
            template: require('./back-button-template.html'),
            scope: {
                myParam: '@'
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.back = function () {
                history.back();
            };
        }
    }

})();
