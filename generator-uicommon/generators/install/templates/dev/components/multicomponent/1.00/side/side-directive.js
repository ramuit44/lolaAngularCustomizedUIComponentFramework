(function appnameSideDirective() {
	'use strict';
	angular.module('appname.common.multicomponent.side').directive('appnameSide', Side);

	Side.$inject = [];

	function Side() {
		var directive = {
			restrict: 'EA',
			template: require('./side-template.html'),
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
