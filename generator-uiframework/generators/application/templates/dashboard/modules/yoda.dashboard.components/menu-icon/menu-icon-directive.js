(function() {
	'use strict';
	var componentsModule = angular.module('yoda.dashboard.components.menuIcon');

	componentsModule.directive('yodaMenuIcon', menuIcon);

	function menuIcon() {
		var directive = {
			restrict: 'EA',
			template: require('./menu-icon-template.html'),
			scope: {
				state: '='
			}
		};

		return directive;
	}
})();
