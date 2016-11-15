(function() {
	'use strict';

	angular
	.module('appname.factories.kickstart', [])
	.factory('kickstartFactory', kickstartFactory);

	kickstartFactory.$inject = ['$q', 'brandswitchFactory', 'userFactory'];

	function kickstartFactory($q, brandswitchFactory, userFactory) {
		var service = {
			getAppData: getAppData
		};
		var init = false;

		function getAppData() {
			if (!init) {
				var deferred = $q.defer();
				// 1 - get the user
				userFactory.getUser().then(function () {
					// 2 - switch brand
					brandswitchFactory.switchBrandStyling(userFactory.current.brand).then(function () {
						init = true;
						// resolve the route
						deferred.resolve();
					}, function () {
						deferred.resolve();
					});
				}, function () {
					deferred.resolve();
				});
				return deferred.promise;
			}
		}

		return service;
	}
})();
