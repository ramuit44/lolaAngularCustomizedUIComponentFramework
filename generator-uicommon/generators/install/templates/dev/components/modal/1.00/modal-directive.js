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
                onClose: '&',
                isStatic: '=',
                headerTitle: '@'
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

    Controller.$inject = ['$attrs', 'modalFactory', '$timeout'];

    function Controller($attrs, modalFactory, $timeout) {
        var vm = this;
        vm.status = modalFactory.modals;
        vm.close = function (fromBackDrop) {
            if (fromBackDrop) {
                if (!vm.isStatic) {
                    if ($attrs.onClose) {
                        vm.onClose({
                            "name": vm.name
                        });
                    } else {
                        vm.status[vm.name] = false;
                    }
                }
            } else {
                if ($attrs.onClose) {
                    vm.onClose({
                        "name": vm.name
                    });
                } else {
                    vm.status[vm.name] = false;
                }
            }

        };

        $timeout(function () {
            modalFactory.openModal(vm.name);
        });
    }

})();
