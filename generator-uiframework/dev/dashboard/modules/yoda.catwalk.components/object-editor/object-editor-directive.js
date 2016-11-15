(function yodaObjectEditorDirective() {
	'use strict';
	angular.module('yoda.catwalk.components.objectEditor', []).directive('yodaObjectEditor', objectEditor);

	objectEditor.$inject = [];

	function objectEditor() {
		var directive = {
			restrict: 'EA',
			template: require('./object-editor-template.html'),
			scope: {
				item: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {

			scope.getType = function (item) {
				if (item.options && item.options.length > 0) {
					return 'select';
				}
				if( Object.prototype.toString.call( item.value ) === '[object Array]' ) {
					return 'array';
				}
				if (item.value === "true" || item.value === "false") {
					return 'boolean';
				}

				return typeof item.value;
			};

		}
	}
})();
