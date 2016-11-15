(function yodaHomePageDirective() {
	'use strict';

	angular.module('yoda.dashboard.homePage').directive('yodaHomePage', homePage);

	homePage.$inject = ['yodaDashboardModulesService'];

	function homePage(yodaDashboardModulesService) {
		var directive = {
			restrict: 'EA',
			template: require('./home-page-template.html'),
			scope: {
			},
			controller: ControllerFunc,
			controllerAs: 'ctrl'
		};

		return directive;
	}

	ControllerFunc.$inject = ['yodaDashboardModulesService'];

	function ControllerFunc(yodaDashboardModulesService) {
		/*jshint validthis: true */
		var vm = this;

		yodaDashboardModulesService.getAppData().then(function(data) {
			vm.appData = data;
		});
	}
})();
