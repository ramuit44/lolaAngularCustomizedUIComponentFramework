(function yodaComponentHtmlReadyDirective() {
	'use strict';
	var componentsModule = angular.module('yoda.catwalk.components.componentHtmlReady', []);
	componentsModule.directive('yodaComponentHtmlReady', componentHtmlReady);

	componentHtmlReady.$inject = [];

	function componentHtmlReady() {
		var directive = {
			restrict: 'EA',
			template: require('./component-html-ready-template.html'),
			scope: {
				params: '=',
				selectedComponent: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			// scope.compiledComponent = "";
			// function update() {
			//
			// }
			// scope.compiledComponent = scope.selectedComponent;''

			// get the prefix

			// get the component name

			// check the component attribute

		}
	}
})();
