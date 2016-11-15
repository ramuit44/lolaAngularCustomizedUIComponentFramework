(function() {
	'use strict';

	angular.module('yoda.dashboard.menu').directive('yodaDashboardMenu', dashboardMenu);

	dashboardMenu.$inject = ['yodaDashboardModulesService'];

	function dashboardMenu(yodaDashboardModulesService) {
		var directive = {
			restrict: 'EA',
			template: require('./menu-template.html'),
			scope: {},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.tree = {};

			// get the data for the menu
			yodaDashboardModulesService.getMenuTree().then(function(result) {
				scope.tree = result;
			});
		}
	}
})();
