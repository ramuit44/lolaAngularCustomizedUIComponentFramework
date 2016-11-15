(function appnameComboboxDirective() {
    'use strict';
    angular.module('appname.common.combobox').directive('appnameCombobox', Combobox);

    Combobox.$inject = [];

    function Combobox() {
        var directive = {
            restrict: 'EA',
            template: require('./combobox-template.html'),
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
        var elem = $element.find('select');
        vm.cmLockedFieldMsg = contentManagementFactory.global.lockedFieldMsg;
        $scope.$watch('vm.list',function(newValue){
           if(newValue){
               $(elem).addClass('combobox');
               $timeout(function() {
                   $(elem).combobox();
                   $element.find('input.combobox').addClass('input-group-input');
                   $element.find('.input-group').addClass('btn-dropdown');
                   $element.find('.input-group').addClass('is-open');
                   $element.find('.input-group').addClass('input-group-row');
               }, 0);
           }
        });
        /*vm.optionChanged = function ($event, index) {
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
        };*/
    }

})();
