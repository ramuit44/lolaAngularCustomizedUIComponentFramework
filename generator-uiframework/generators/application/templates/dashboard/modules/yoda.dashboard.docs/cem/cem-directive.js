(function yodaCemDirective() {
	'use strict';
	angular.module('yoda.dashboard.docs.cem').directive('yodaDashboardCem', cem);

	cem.$inject = [];

	function cem() {
		var directive = {
			restrict: 'EA',
			template: require('./cem-template.html'),
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
