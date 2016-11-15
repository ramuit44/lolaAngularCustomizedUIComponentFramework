(function guiRegisterDirective() {
	'use strict';
	angular.module('gui.ng.forms.register', []).directive('guiRegister', register);

	register.$inject = [];

	function register() {
		var directive = {
			restrict: 'EA',
			template: require('./register-template.html'),
			scope: {},
			controller : ['$scope', '$attrs', function(scope, $attrs) {
				var vm = this;

				vm.genders = [
					{label: 'Woman', value: 'Woman'},
					{label: 'Man', value: 'Man'}
				];

				vm.formData = {};

				vm.handleSubmit = function(valid, formData) {
					if (valid) {
						scope.$eval($attrs.onValidSubmit);
						console.log('data submitted:');
						console.log( formData );
						scope.dataSubmitted = JSON.stringify(formData);
					} else {
						console.log('form invalid');
					}
				};

			}],
			controllerAs: 'ctrl',
		};

		return directive;
	}
})();
