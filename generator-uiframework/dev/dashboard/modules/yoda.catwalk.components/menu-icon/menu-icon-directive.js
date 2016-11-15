(function() {
	'use strict';
	var ngIcons = require('angular-material-icons');
	var componentsModule = angular.module('yoda.catwalk.components.menuIcon');

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
