(function appnameTabsDirective() {
    'use strict';
    angular.module('appname.common.tabs').directive('appnameTabs', Tabs);

    Tabs.$inject = [];

    function Tabs() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = [];

    function Controller() {
        var vm = this;
        vm.selectedTab = 0;

        activate();

        function activate() {

        }
    }

})();
