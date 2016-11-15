(function yodaBrandSwitchDirective() {
	'use strict';
	angular.module('yoda.dashboard.brandSwitch').directive('yodaBrandSwitch', brandSwitch);

	brandSwitch.$inject = [];

	function brandSwitch() {
		var directive = {
			restrict: 'E',
			template: require('./brand-switch-template.html'),
			scope: {},
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;
	}

	Controller.$inject = ['$scope','yodaDashboardModulesService', '$rootScope', '$state'];

	function Controller(scope, yodaDashboardModulesService, $rootScope, $state) {
		var vm = this;
		var BRAND_LOCALSTORAGE_KEY = 'brand';

		// Store the brand in the localStorage when the value is change in the dropdown
		scope.updateBrand = function () {
			localStorage.setItem(BRAND_LOCALSTORAGE_KEY, $rootScope.brand);
			initGruntIcon($rootScope.brand);
			// $state.go($state.current, {}, {reload: true});
		};

		// get the list of brands
		yodaDashboardModulesService.getAppData().then(function(appData) {
			vm.brands = yodaDashboardModulesService.options.brands;
			// Retrieve the brand from localStorage if the key exist
			var brand = localStorage.getItem(BRAND_LOCALSTORAGE_KEY);
			if (brand) {
				$rootScope.brand = brand;
			} else  {
				$rootScope.brand = vm.brands[0];
			}
			initGruntIcon($rootScope.brand);
		});

		function initGruntIcon(brand) {
			grunticon(['app/build/' + brand + '/css/symbols.data.svg.css', 'app/build/' + brand + '/css/symbols.data.png.css', 'app/build/' + brand + '/css/symbols.fallback.css'], grunticon.svgLoadedCallback);
		}
	}

})();
