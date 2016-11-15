(function yodaHomePageDirective() {
	'use strict';

	require('../menu');

	angular.module('yoda.catwalk.homePage', []).directive('yodaHomePage', homePage);

	homePage.$inject = ['CatwalkDataService'];

	function homePage(catwalkDataService) {
		var directive = {
			restrict: 'EA',
			template: require('./home-page-template.html'),
			scope: {
				myParam: '@'
			},
			controller: ControllerFunc,
			controllerAs: 'ctrl'
		};

		return directive;
	}

	ControllerFunc.$inject = ['CatwalkDataService'];

	function ControllerFunc(catwalkDataService) {
		/*jshint validthis: true */
		var vm = this;

		catwalkDataService.getAppData().then(function(data) {
			vm.appData = data;
		});
	}
})();
