(function appnameHeaderDirective() {
    'use strict';
    angular.module('appname.common.header').directive('appnameHeader', Header);

    Header.$inject = [];

    function Header() {
        var directive = {
            restrict: 'EA',
            template: require('./header-template.html'),
            scope: {
                step: "="
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        function linkFunc(scope, el, attr, ctrl) {}

        return directive;
    }

    Controller.$inject = ['userFactory', 'contentManagementFactory'];

    function Controller(userFactory, contentManagementFactory) {
        var vm = this;
        vm.user = userFactory;
        vm.cmLabels = contentManagementFactory.header;

        vm.maintainPreferences = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference]);
        };

        vm.enablePreferences = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainRole] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.brandSwap] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.subBrandSwap]);
        };
    }
})();
