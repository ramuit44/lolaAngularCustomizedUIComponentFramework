(function yodaCoveragePageDirective() {
	'use strict';
	angular.module('yoda.dashboard.coveragePage', []).directive('yodaCoveragePage', coveragePage);

	coveragePage.$inject = [];

	function coveragePage() {
		var directive = {
			restrict: 'EA',
			template: require('./coverage-page-template.html'),
			scope: false
		};

		return directive;

	}
})();
