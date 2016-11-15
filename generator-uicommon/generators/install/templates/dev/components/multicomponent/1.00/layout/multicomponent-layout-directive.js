(function appnameMulticomponentDirective() {
	'use strict';
	angular.module('appname.common.multicomponent.multicomponentLayout').directive('appnameMulticomponentLayout', Multicomponent);

	Multicomponent.$inject = [];

	function Multicomponent() {
		var directive = {
			restrict: 'EA',
			template: require('./multicomponent-layout-template.html'),
			scope: {
				myTopParam: '=',
				mySideParam: '=',
				myBottomParam: '=',
				myCenterParam: '='
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
