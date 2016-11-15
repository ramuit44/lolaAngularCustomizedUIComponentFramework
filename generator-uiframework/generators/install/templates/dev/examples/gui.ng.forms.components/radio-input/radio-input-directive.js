(function guiRadioInputDirective() {
	'use strict';
	angular.module('gui.ng.forms.components.radioInput', []).directive('guiRadioInput', radioInput);

	function radioInput() {
		var directive = {
			restrict: 'EA',
			template: require('./radio-input-template.html'),
			scope: {
				fieldOptions: '=',
				fieldModel: '='
			},
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;
	}

    function Controller() {
        var vm = this;
    }
})();
