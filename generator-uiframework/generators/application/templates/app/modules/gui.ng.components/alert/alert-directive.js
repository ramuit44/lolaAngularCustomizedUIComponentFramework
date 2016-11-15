(function guiAlertDirective() {
	'use strict';
	var componentsModule = angular.module('gui.ng.components.alert', []);
	componentsModule.directive('guiAlert', alert);

	alert.$inject = [];

	function alert() {
		var directive = {
			restrict: 'EA',
			transclude: true,
			template: require('./alert-template.html'),
			scope: {
				type: '@',
				closeButton: '=?',
				isClosed: '=?'
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.isClosed = scope.isClosed || false;
			scope.closeAlert = function() {
				scope.isClosed = true;
			};
		}
	}
})();
