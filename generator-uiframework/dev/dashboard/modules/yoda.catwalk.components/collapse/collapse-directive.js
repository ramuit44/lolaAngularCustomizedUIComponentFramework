(function() {
	'use strict';
	var componentsModule = angular.module('yoda.catwalk.components.collapse', []);

	componentsModule.directive('yodaCollapse', collapse);

	collapse.$inject = [];

	function collapse() {
		var directive = {
			restrict: 'EA',
			template: require('./collapse-template.html'),
			scope: {
				name: '@',
				components: '=',
				itemsHeight: '=',
				state: '@'
			},
			link: {
				post: linkPostFunc
			}
		};

		return directive;

		function linkPostFunc(scope, el, attr, ctrl) {
			scope.isOpen = false;
			var element = el;
			// FIXME : get the size from the view
			var elementHeight = 38;
			var numberOfElements = Object.keys(scope.components).length;
			scope.containerMargin = elementHeight * numberOfElements;

			scope.trigger = function () {
				scope.isOpen = !scope.isOpen;
				scope.containerMargin = scope.isOpen ? 0 : elementHeight * numberOfElements;
			};

			scope.isEmpty = function (obj) {

				// null and undefined are "empty"
				if (obj === null) return true;

				// Assume if it has a length property with a non-zero value
				// that that property is correct.
				if (obj.length > 0)    return false;
				if (obj.length === 0)  return true;

				// Otherwise, does it have any properties of its own?
				// Note that this doesn't handle
				// toString and valueOf enumeration bugs in IE < 9
				for (var key in obj) {
					if (hasOwnProperty.call(obj, key)) return false;
				}

				return true;
			};
		}
	}
})();
