(function appnameDropdownDirective() {
  'use strict';
  angular.module('appname.common.dropdown').directive('appnameDropdown', Dropdown);

  //require('../../../../libs/jquery.trap.js');

  Dropdown.$inject = [];

  function Dropdown() {
      var directive = {
          restrict: 'EA',
          template: require('./dropdown-template.html'),
          scope: {
              buttonDefault: '@',
              buttonIcon: '@',
              buttonModel: '=',
              buttonOptions: '=',
              labelName: '@',
              valueName: '@',
              name: '@',
              onChange: '&',
              isDisabled: '='
          },
          controller: Controller,
          controllerAs: 'vm',
          bindToController: true,
          link: linkFunc
      };

      function linkFunc(scope, el, attr, ctrl) {}

      return directive;
  }

  Controller.$inject = ['$attrs', '$scope', '$element', 'trapFactory', '$timeout'];

  function Controller($attrs, $scope, $element, trapFactory, $timeout) {
      var vm = this;
      vm.isOpen = false;
      var init = function () {
          if (vm.buttonDefault) {
              vm.buttonModel = vm.buttonDefault;
              for (var i = 0; i < vm.buttonOptions.length; i++) {
                  if (vm.valueName && vm.labelName) {
                      if (vm.buttonOptions[i][vm.valueName] === vm.buttonDefault) {
                          vm.buttonLabel = vm.buttonOptions[i][vm.labelName];
                          break;
                      }
                  } else {
                      if (vm.buttonOptions[i] === vm.buttonDefault) {
                          vm.buttonLabel = vm.buttonOptions[i];
                          break;
                      }
                  }
              }
          } else {
              if (vm.valueName && vm.labelName) {
                  vm.buttonModel = vm.buttonOptions[0][vm.valueName];
                  vm.buttonLabel = vm.buttonOptions[0][vm.labelName];
              } else {
                  vm.buttonModel = vm.buttonOptions[0];
                  vm.buttonLabel = vm.buttonOptions[0];
              }
          }
      };
      init();

      var trapIndex;
      vm.trigger = function () {
          vm.isOpen = !vm.isOpen;
          if (vm.isOpen) {
              trapIndex = trapFactory.trapUser($element.find('.dropdown-menu-sm'), $element.attr('name'));
          } else {
              trapFactory.untrapUser($element.attr('name'));
              $element.find('.js-button-dropdown').focus();
          }
      };

      vm.setValue = function (item) {
          var oldModelVal = vm.buttonModel;
          if (vm.valueName && vm.labelName) {
              vm.buttonModel = item[vm.valueName];
              vm.buttonLabel = item[vm.labelName];
          } else {
              vm.buttonModel = item;
              vm.buttonLabel = item;
          }
          vm.isOpen = false;
          trapFactory.untrapUser($element.attr('name'));
          $element.find('.js-button-dropdown').focus();
          if ($attrs.onChange && (oldModelVal !== vm.buttonModel)) {
              $timeout(function () {
                  $scope.$apply();
                  vm.onChange();
              }, 0, true);
          }
      };

      $scope.$watch(function () {
              return vm.buttonOptions;
          },
          function (newVal, oldVal) {
              if (newVal != oldVal) {
                  if (vm.valueName && vm.labelName) {
                      vm.buttonModel = vm.buttonOptions[0][vm.valueName];
                      vm.buttonLabel = vm.buttonOptions[0][vm.labelName];
                  } else {
                      vm.buttonModel = vm.buttonOptions[0];
                      vm.buttonLabel = vm.buttonOptions[0];
                  }
              }
          }
      );


      $scope.$watch(function () {
              return vm.buttonModel;
          },
          function (newVal, oldVal) {
              if (newVal != oldVal) {
                  var selectedOption = _.find(vm.buttonOptions, function (option) {
                      var optionValue = vm.valueName ? option[vm.valueName] : option;
                      return _.isEqual(optionValue, vm.buttonModel);
                  });
                  vm.buttonLabel = vm.labelName ? selectedOption[vm.labelName] : selectedOption;
              }
          }
      );

      $element.on('$destroy', function () {
          trapFactory.untrapUser($element.attr('name'));
      });

  }


})();
