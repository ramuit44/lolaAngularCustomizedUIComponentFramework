(function appnamePreferencesLayoutDirective() {
    'use strict';
    angular.module('appname.preferences.preferencesLayout').directive('appnamePreferencesLayout', PreferencesLayout);

    PreferencesLayout.$inject = [];

    function PreferencesLayout() {
        var directive = {
            restrict: 'EA',
            template: require('./preferences-layout-template.html'),
            scope: {},
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    Controller.$inject = ['$state', '$element', 'userFactory', 'brandswitchFactory', 'contentManagementFactory'];


    function Controller($state, $element, userFactory, brandswitchFactory, contentManagementFactory) {
        var vm = this;
        vm.isStatic = true;
        vm.user = userFactory;
        vm.formData = {
            "brand": vm.user.currentUserDetails.brand,
            "role": null,
            "bsb": vm.user.currentUserDetails.userBsbNumber ? $.trim(vm.user.currentUserDetails.userBsbNumber) : vm.user.currentUserDetails.userBsbNumber,
            "contactNumber": vm.user.currentUserDetails.contactNumber
        };
        vm.cmLabels = contentManagementFactory.preferences;
        vm.isError = false;

        vm.submitForm = function () {
            if (!vm.userPreferencesForm.$invalid) {
                if (checkForOnlyBrandSwitching()) {
                    handleOnUILayer();
                } else {
                    handleOnServiceLayer();
                }
            }
        };

        var checkForOnlyBrandSwitching = function () {
            if ((!vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference] && !vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainRole]) && (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.brandSwap] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.subBrandSwap])) {
                return true;
            } else {
                return false;
            }
        };

        var handleOnUILayer = function () {
            vm.user.currentUserDetails.brand = vm.formData.brand;
            vm.user.delegatedAccessDetails = angular.copy(vm.user.currentUserDetails);
            vm.user.isDelegatedRole = true;
            brandswitchFactory.switchBrandStyling(userFactory.currentUserDetails.brand.toUpperCase());
            $state.go('home.welcome');
        };

        var handleOnServiceLayer = function () {
            var payload = constructPayload();
            userFactory.updateUserDetails(payload).then(function () {
                    vm.isError = false;
                    vm.errorMsg = '';
                    vm.permissions = JSON.stringify(userFactory.currentUserDetails.permissions);
                    vm.role = JSON.stringify(userFactory.currentUserDetails.role);
                    brandswitchFactory.switchBrandStyling(userFactory.currentUserDetails.brand.toUpperCase()).then(function () {
                        $state.go('home.welcome');
                    }, function () {
                        vm.isError = true;
                        vm.errorCondition = "genericError";
                    });
                },
                function () {
                    if (vm.user.isError.invalidBsb === true) {
                        vm.errorCondition = "invalidBsb";
                    } else {
                        vm.errorCondition = "genericError";
                    }
                    vm.isError = true;
                });
        };

        var constructPayload = function () {
            var payload = {
                "roleName": "rf" + '-' + vm.formData.brand + '-' + userFactory.currentUserDetails.role,
                "brand": vm.formData.brand,
                "bsbNumber": "",
                "contactNumber": ""
            };

            if (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference]) {
                payload.bsbNumber = vm.formData.bsb;
                payload.contactNumber = vm.formData.contactNumber;
            }
            if (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainRole]) {
                payload.roleName = "rf" + '-' + vm.formData.brand + '-' + vm.formData.role;
            }

            return payload;
        };

    }

})();
