(function() {
	'use strict';

	angular.module('yoda.catwalk.menu').directive('yodaCatwalkMenu', catwalkMenu);

	catwalkMenu.$inject = ['CatwalkDataService'];

	function catwalkMenu(catwalkDataService) {
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
			catwalkDataService.getMenuTree().then(function(result) {
				scope.tree = result;
			});
		}
	}
})();
