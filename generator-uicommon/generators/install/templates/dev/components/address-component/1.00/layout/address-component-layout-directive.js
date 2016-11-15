(function appnameAddressComponentLayoutDirective() {
	'use strict';
	angular.module('appname.common.addressComponentLayout').directive('appnameAddressComponentLayout', AddressComponentLayout);

	AddressComponentLayout.$inject = [];

	function AddressComponentLayout() {
		var directive = {
			restrict: 'EA',
			template: require('./address-component-layout-template.html'),
			scope: {
				"addressObj": '=',
				'labelName': '@',
				'valueName': '@',
				'groupTitle': '@',
				'name': '@',
				'onChange': '&',
				'isDisabled': '=',
				'isRequired': '=',
				'isInvalid': '=',
				'errorMsg': '@',
				'tooltipPosition': '@',
				'getMatchingAddressList': '&',
				'getFormattedAddress': '&',
				'matchingAddressList': '=',
				'formattedAddress': '=',
				'stateList': '=',
				'countryList': '='
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

	Controller.$inject = ['$element', '$scope', '$attrs', '$parse', 'contentManagementFactory', '$compile'];

	function Controller($element, $scope, $attrs, $parse, contentManagementFactory, $compile) {
		$scope.getList = function(addressValue){
			$scope.vm.getMatchingAddressList( {addressValue : addressValue}, $scope, { $event: event });
		};
		$scope.getValue = function(idValue) {
			$scope.vm.getFormattedAddress({idValue: idValue}, $scope, {$event: event});
		};
		$scope.$watch('vm.countryList',function(newValue) {
			if (newValue) {
				$scope.countryList = newValue;
			}
		});
		$scope.countryChanged = function(){
			clearAddress();
			if($scope.vm.addressObj.country && $scope.vm.addressObj.country.code){
				if($scope.vm.addressObj.country.code!='AU'){
					$scope.vm.addressObj.showAddressFields = "Y";
					$scope.vm.addressObj.state.code = "FOR";
				}else{
					$scope.vm.addressObj.showAddressFields = "N";
				}
			}
		};
		function clearAddress() {
			$scope.vm.addressObj.addressLine1 = "";
			$scope.vm.addressObj.addressLine2 = "";
			$scope.vm.addressObj.addressLine3 = "";
			$scope.vm.addressObj.state = {};
			$scope.vm.addressObj.city = "";
			$scope.vm.addressObj.pocode = "";
			$scope.vm.addressObj.qasAddress = "";
		}
		/*$scope.addressObj = $scope.vm.addressObj;
		 $scope.matchedAddress = $scope.vm.formattedAddress;
		 $scope.matchingList = $scope.vm.matchingAddressList;*/

	}

})();
