(function() {
	'use strict';
	angular.module('yoda.catwalk.layout').directive('yodaCatwalkLayout', catwalkLayout);

	catwalkLayout.$inject = ['$rootScope', '$state'];

	function catwalkLayout($rootScope, $state) {
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
