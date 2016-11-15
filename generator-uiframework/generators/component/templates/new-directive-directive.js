(function fullnameDirective() {
	'use strict';
	angular.module('prefix.moduleName.newDirective').directive('fullname', newDirective);

	newDirective.$inject = [];

	function newDirective() {
		var directive = {
			restrict: 'EA',
			template: require('./new-directive-template.html'),
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
