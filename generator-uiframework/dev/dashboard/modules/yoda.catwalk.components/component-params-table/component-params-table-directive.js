(function yodaComponentParamsTableDirective() {
	'use strict';
	var componentsModule = angular.module('yoda.catwalk.components.componentParamsTable', []);
	componentsModule.directive('yodaComponentParamsTable', componentParamsTable);

	componentParamsTable.$inject = ['yodaStringHelperService'];

	function componentParamsTable(yodaStringHelperService) {
		var directive = {
			restrict: 'EA',
			template: require('./component-params-table-template.html'),
			scope: {
				params: '='
			},
			link: linkFunc
		};

		return directive;
		function linkFunc(scope, el, attr, ctrl) {
			scope.edit = false;

			scope.changeMode = function () {
				scope.edit = !scope.edit;
			};

			scope.toCamelCase = yodaStringHelperService.toCamelCase;
			scope.hyphenate = yodaStringHelperService.hyphenate;

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
