(function() {
	'use strict';
	angular.module('yoda.dashboard.layout').directive('yodaDashboardLayout', dashboardLayout);

	dashboardLayout.$inject = ['$rootScope', '$state'];

	function dashboardLayout($rootScope, $state) {
		var directive = {
			restrict: 'EA',
			template: require('./layout-template.html'),
			scope: {},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.isMenuOpen = true;
			scope.triggerMenu = function () {
				scope.isMenuOpen = !scope.isMenuOpen;
			};

			scope.state = $state;
		}
	}
})();
