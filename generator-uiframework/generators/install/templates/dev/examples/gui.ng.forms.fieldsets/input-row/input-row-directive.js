(function guiInputRowDirective() {
	'use strict';
	angular.module('gui.ng.forms.fieldsets.inputRow', []).directive('guiInputRow', inputRow);

	inputRow.$inject = [];

	function inputRow() {
		var directive = {
			transclude: true,
			restrict: 'EA',
			template: require('./input-row-template.html'),
			scope: {
				label: '@',
				fieldModel: '=',
				fieldType: '@',
				fieldId: '@',
				fieldRequired: '=',
				fieldPlaceholder: '@?',
				fieldValues: '='
			},
			bindToController: true,
			controller: ['$scope', '$attrs', function(scope, $attrs) {}],
			controllerAs: 'fieldCtrl'
		};

		return directive;
	}
})();
