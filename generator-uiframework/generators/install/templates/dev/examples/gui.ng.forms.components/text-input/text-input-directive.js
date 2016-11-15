(function guiTextInputDirective() {
	'use strict';
	angular.module('gui.ng.forms.components.textInput', []).directive('guiTextInput', textInput);

	textInput.$inject = [];

	function textInput() {
		var directive = {
			restrict: 'EA',
			template: require('./text-input-template.html'),
			scope: {
				params: '=',
			}
		};

		return directive;
	}
})();
