(function appnameModalDirective() {
    'use strict';
    angular.module('appname.common.modal').directive('appnameModal', Modal);

    Modal.$inject = ['trapFactory'];

    function Modal(trapFactory) {
        var directive = {
            restrict: 'EA',
            template: require('./modal-template.html'),
            scope: {
                name: '@',
                onClose: '&'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            link: linkFunc
        };

        function linkFunc(scope, el, attr, ctrl) {
            trapFactory.trapUser(el, attr.name);

            el.on('$destroy', function () {
                trapFactory.untrapUser(attr.name);
            });
        }

        return directive;
    }

    Controller.$inject = ['modalFactory'];

    function Controller(modalFactory) {
        var vm = this;
        vm.status = modalFactory.modals;

        vm.close = function () {
            vm.onClose({
                'fromBackDrop': true
            });
        };

    }

})();
