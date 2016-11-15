(function appnameCenterDirective() {
	'use strict';
	angular.module('appname.common.multicomponent.center').directive('appnameCenter', Center);

	Center.$inject = [];

	function Center() {
		var directive = {
			restrict: 'EA',
			template: require('./center-template.html'),
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
