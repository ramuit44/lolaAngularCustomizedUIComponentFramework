(function appnameBlockButtonsDirective() {
    'use strict';
    angular.module('appname.common.blockButtons').directive('appnameBlockButtons', BlockButtons);

    BlockButtons.$inject = [];

    function BlockButtons() {
        var directive = {
            restrict: 'EA',
            template: require('./block-buttons-template.html'),
            scope: {
                "list": '=',
                "model": '=',
                'labelName': '@',
                'valueName': '@',
                'groupTitle': '@',
                'name': '@',
                'onChange': '&',
                'isDisabled': '=',
                'isRequired': '=',
                'isInvalid': '=',
                'errorMsg': '@',
                'tooltipPosition': '@'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs', '$timeout', 'contentManagementFactory', 'referenceDataFactory'];

    function Controller($element, $scope, $attrs, $timeout, contentManagementFactory, referenceDataFactory) {
        var vm = this;
        vm.cmLockedFieldMsg = contentManagementFactory.global.lockedFieldMsg;

        vm.optionChanged = function ($event, index) {
            var oldValue = vm.model;
            vm.model = vm.list[index][vm.labelName] ? vm.list[index][vm.valueName] : vm.list[index];
            if (vm.model !== oldValue) {
                angular.element($event.target).prev().click();
                if ($attrs.onChange) {
                    $timeout(function () {
                        $scope.$apply();
                        vm.onChange({
                            'name': vm.name
                        });
                    }, 0, true);

                }
            }
        };
    }

})();
