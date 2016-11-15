(function appnameNonStandardAddressDirective() {
    'use strict';
    angular.module('appname.common.nonStandardAddress').directive('appnameNonStandardAddress', NonStandardAddress);

    NonStandardAddress.$inject = ['$compile','$parse'];

    function NonStandardAddress($compile,$parse) {
        var directive = {
            restrict: 'EA',
            template: require('./non-standard-address-template.html'),
            scope: {
                "addressObj": '=',
                'labelName': '@',
                'valueName': '@',
                'groupTitle': '@',
                'name': '@',
                'onChange': '&',
                'isDisabled': '=',
                'isRequired': '=',
                'isInvalid': '=',
                'errorMsg': '@',
                'tooltipPosition': '@',
                'stateList': '='
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.address = scope.vm.addressObj;
            scope.$watch('vm.stateList',function(newValue) {
                if (newValue) {
                    scope.stateList = newValue;
                }
            });
        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs', '$parse', 'contentManagementFactory', '$compile'];

    function Controller($element, $scope, $attrs, $parse, contentManagementFactory, $compile) {

    }

})();
