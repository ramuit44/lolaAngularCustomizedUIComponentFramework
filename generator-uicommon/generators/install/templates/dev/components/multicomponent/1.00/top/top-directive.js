(function appnameTopDirective() {
	'use strict';
	angular.module('appname.common.multicomponent.top').directive('appnameTop', Top);

	Top.$inject = [];

	function Top() {
		var directive = {
			restrict: 'EA',
			template: require('./top-template.html'),
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
