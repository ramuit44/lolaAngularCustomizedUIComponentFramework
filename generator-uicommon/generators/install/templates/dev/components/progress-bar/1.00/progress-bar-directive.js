(function appnameProgressBarDirective() {
    'use strict';
    angular.module('appname.common.progressBar').directive('appnameProgressBar', progressBar);

    progressBar.$inject = ['contentManagementFactory'];

    function progressBar(contentManagementFactory) {
        var directive = {
            restrict: 'EA',
            template: require('./progress-bar-template.html'),
            scope: {
                step: '=',
                steps: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.cmLabels = contentManagementFactory.progressBar;
        }
    }

})();
