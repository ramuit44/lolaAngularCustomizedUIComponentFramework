(function guiEmailInputDirective() {
	'use strict';
	angular.module('gui.ng.forms.components.emailInput', []).directive('guiEmailInput', emailInput);

	emailInput.$inject = [];

	function emailInput() {
		var directive = {
			restrict: 'EA',
			template: require('./email-input-template.html'),
			scope: {
				params: '=',
			}
		};

		return directive;
	}
})();
