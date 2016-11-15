(function appnameBottomDirective() {
	'use strict';
	angular.module('appname.common.multicomponent.bottom').directive('appnameBottom', Bottom);

	Bottom.$inject = [];

	function Bottom() {
		var directive = {
			restrict: 'EA',
			template: require('./bottom-template.html'),
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
