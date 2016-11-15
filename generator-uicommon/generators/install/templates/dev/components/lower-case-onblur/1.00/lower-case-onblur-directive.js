(function appnameComponentLowerCaseOnBlur() {
    'use strict';
    angular.module('appname.common.lowerCaseOnblur').directive('appnameLowerCaseOnBlur', LowerCaseOnBlur);

    LowerCaseOnBlur.$inject = [];

    function LowerCaseOnBlur() {
        var directive = {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                var handleInputBlur = function () {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue.toLowerCase());
                    ngModelCtrl.$render();
                };
                element.bind('blur', function () {
                    handleInputBlur();
                });
            }
        };

        return directive;
    }

})();
