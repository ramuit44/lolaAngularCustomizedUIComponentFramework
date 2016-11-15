(function guiTestDirective() {
	'use strict';
	angular.module('gui.common.test').directive('guiTest', test);

	test.$inject = [];

	function test() {
		var directive = {
			restrict: 'EA',
			template: require('./test-template.html'),
			scope: {
				myParam: '@'
			},
			link: linkFunc,
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.message = 'Welcome';
		}
	}

	Controller.$inject = [];

	function Controller() {
		 var vm = this;

		 activate();

		 function activate() {

		 }
	}

})();
