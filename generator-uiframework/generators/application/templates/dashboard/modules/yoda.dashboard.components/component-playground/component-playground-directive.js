(function yodaComponentPlaygroundDirective() {
	'use strict';
	var componentsModule = angular.module('yoda.dashboard.components.componentPlayground', []);
	componentsModule.directive('yodaComponentPlayground', componentPlayground);

	componentPlayground.$inject = [];

	function componentPlayground() {
		var directive = {
			restrict: 'EA',
			template: require('./component-playground-template.html'),
			scope: {
				params: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.getType = function (item) {
				return typeof item;
			};
		}
	}
})();
