(function appnameWelcomeHelpDirective() {
	'use strict';
	angular.module('appname.welcome.welcomeHelp').directive('appnameWelcomeHelp', welcomeHelp);

	function welcomeHelp() {
		var directive = {
			restrict: 'EA',
			template: require('./welcome-help-template.html'),
			scope: {},
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;
	}

	Controller.$inject = ['$scope', '$state', 'demoFactory'];

	function Controller($scope, $state, demoFactory) {
		var vm = this;
		// get the username from the userFactory
		// We are getting the user data during the resolve of the base route
		// so the user factory is already populated

		//vm.firstName = userFactory.current.userName;

		demoFactory.fetchDemoList().then(function(){

				vm.user = demoFactory.demoList;
				vm.firstName = vm.user.userName;

		},
		function(){
				console.log("error");
		});


	}

})();
