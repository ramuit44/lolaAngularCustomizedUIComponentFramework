(function appnamePreferencesFormDirective() {
    'use strict';
    angular.module('appname.preferences.preferencesForm').directive('appnamePreferencesForm', PreferencesForm);

    PreferencesForm.$inject = [];

    function PreferencesForm() {
        var directive = {
            restrict: 'EA',
            template: require('./preferences-form-template.html'),
            scope: {
                'formData': '=',
                'formObject': '='
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        function linkFunc(scope, el, attr, ctrl) {

        }

        return directive;
    }

    Controller.$inject = ['userFactory', 'contentManagementFactory', 'referenceDataFactory'];

    function Controller(userFactory, contentManagementFactory, referenceDataFactory) {
        var vm = this;
        vm.user = userFactory;
        vm.cmLabels = contentManagementFactory.preferences.body;
        vm.listKeyValue = referenceDataFactory.global.listKeyValue;

        vm.validation = {
            "contactNumber": referenceDataFactory.preferences.validation.contactNumber
        };

        var updateValidationRules = function (isOnBrandChange) {
            var brand;
            if (isOnBrandChange) {
                brand = vm.formData.brand;
                vm.roleKey = (brand !== "wbc") ? "nonWbc" : "wbc";
            } else {
                brand = vm.user.currentUserDetails.brand;
            }
            if (brand !== "wbc") {
                vm.validation.bsbNumber = referenceDataFactory.preferences.validation.bsbNumber.nonWbc;
            } else {
                vm.validation.bsbNumber = referenceDataFactory.preferences.validation.bsbNumber.wbc;
            }
        };
        updateValidationRules(false);
        vm.roles = vm.user.roles;
        if (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.subBrandSwap]) {
            vm.brands = vm.user.brands.stg;
        } else {
            vm.brands = vm.user.brands.wbc;
        }
        vm.defaultBrand = vm.formData.brand ? vm.formData.brand : vm.brands[0][vm.listKeyValue.labelName];
        vm.roleKey = (vm.defaultBrand !== "wbc") ? "nonWbc" : "wbc";
        vm.defaultRole = vm.roles[vm.roleKey][0][vm.listKeyValue.labelName] ? vm.roles[vm.roleKey][0][vm.listKeyValue.valueName] : vm.roles[vm.roleKey][0];

        vm.isbsbPrefixDisplayed = function () {
            return (vm.formData.brand === "wbc");
        };

        vm.isBsbRequired = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference]);
        };

        vm.isContactNumRequired = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference]);
        };

        vm.onRoleChange = function () {
            //vm.user.currentUserDetails.role = "rf" + "-" + vm.user.currentUserDetails.brand + "-" + vm.user.currentUserDetails.role;
        };

        vm.isRoleRequired = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainRole]);
        };

        vm.onBrandChange = function () {
            //vm.user.currentUserDetails.role = "rf" + "-" + vm.user.currentUserDetails.brand+ "-" + vm.user.currentUserDetails.role;
            updateValidationRules(true);
        };

        vm.isBrandRequired = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.brandSwap] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.subBrandSwap]);
        };

        vm.isFieldInvalid = function (fieldName) {
            return (vm.formObject[fieldName] && vm.formObject[fieldName].$invalid && ((vm.formObject.$submitted && vm.formObject[fieldName].$dirty) || vm.formObject[fieldName].$touched));
        };
    }

})();
