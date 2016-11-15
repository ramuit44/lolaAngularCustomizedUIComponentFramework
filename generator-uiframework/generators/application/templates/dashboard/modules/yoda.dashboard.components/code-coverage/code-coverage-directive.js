(function yodaCodeCoverageDirective() {
	'use strict';
	angular.module('yoda.dashboard.components.codeCoverage', []).directive('yodaCodeCoverage', codeCoverage);

	codeCoverage.$inject = [];

	function codeCoverage() {
		var directive = {
			restrict: 'EA',
			template: require('./code-coverage-template.html'),
			scope: {
				myParam: '@'
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.message = 'Welcome';
		}
	}
})();
