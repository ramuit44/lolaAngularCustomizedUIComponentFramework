(function appnamePopoverDirective() {
    'use strict';
    angular.module('appname.common.popover').directive('appnamePopover', Popover);

    Popover.$inject = [];
    function Popover() {
      var directive = {
        restrict: 'EA',
        template: require('./popover-template.html'),
        scope: {
            popoverTitle: '@',
            message: '@',
            trigger: '@',
            verticalPosition: '@',
            horizontalPosition: '@',
            name: '@'
        },
        link: linkFunc,
        controller: Controller,
        controllerAs: 'vm',
        transclude: true,
        bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        if (scope.vm.trigger === 'hover') {
            el.find('.popover').hover(function () {
                el.find('.popover-wrapper').addClass('is-open');
            }, function () {
                el.find('.popover-wrapper').removeClass('is-open');
            });
    }
}
}

Controller.$inject = ['popoverFactory'];

function Controller(popoverFactory) {
    var vm = this;
    vm.status = popoverFactory.popovers;
}

})();
