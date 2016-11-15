/**
* Brandswitch Model to fetch the Brandswitch details.
*/
(function () {
	'use strict';

	angular.module('appname.factories.brandswitch', []).factory('brandswitchFactory', Brandswitch);
	Brandswitch.$inject = ['$timeout', '$q', '$rootScope', 'angularLoad', 'referenceDataFactory'];

	function Brandswitch($timeout, $q, $rootScope, angularLoad, referenceDataFactory) {
		var brands = referenceDataFactory.global.brands;
		var defaultBrand = referenceDataFactory.global.defaultBrand;

		var disableAllBrands = function () {
			for (var index = 0; index < brands.length; index++) {
				if ($('link[href*=' + brands[index] + ']').length) {
					if ($rootScope.brand !== brands[index]) {
						$('link[href*=' + brands[index] + ']').prop('disabled', true);
					}
				}
			}
		};

		Brandswitch.switchBrandStyling = function (brand) {
			var deferred = $q.defer();

			if (!brand) {
				brand = defaultBrand;
			}

			$rootScope.brand = brand;
			if ($('link[href*=' + $rootScope.brand + ']').length) {
				disableAllBrands();
				$('link[href*=' + $rootScope.brand + ']').prop('disabled', false);
				$timeout(function () {
					deferred.resolve();
				}, 0, false);
			} else {
				// init grunticon with the user brand
				grunticon(['app/build/' + $rootScope.brand + '/css/symbols.data.svg.css', 'app/build/' + $rootScope.brand + '/css/symbols.data.png.css', 'app/build/' + $rootScope.brand + '/css/symbols.fallback.css'], grunticon.svgLoadedCallback);

				// dynamically load the css for the correct brand
				angularLoad.loadCSS('app/build/' + $rootScope.brand + '/css/appname.app.css').then(function () {
					disableAllBrands();
					deferred.resolve();
				}).catch(function () {
					deferred.reject();
				});
			}
			return deferred.promise;
		};


		return Brandswitch;
	}
})();
