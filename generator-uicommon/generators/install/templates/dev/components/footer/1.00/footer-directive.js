(function appnameFooterDirective() {
    'use strict';
    angular.module('appname.common.footer').directive('appnameFooter', Footer);

    Footer.$inject = ['contentManagementFactory'];

    function Footer(contentManagementFactory) {
        var directive = {
            restrict: 'EA',
            template: require('./footer-template.html'),
            scope: {
                brand: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.cmLabels = contentManagementFactory.footer;
        }
    }

})();
