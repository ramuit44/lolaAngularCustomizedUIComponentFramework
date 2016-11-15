(function guiGrunticonsEmbedDirective() {
	'use strict';
	var componentsModule = angular.module('gui.ng.components.grunticonEmbed', []);
	componentsModule.directive('grunticonEmbed', grunticonEmbed);

	function grunticonEmbed() {
		var directive = {
			restrict: 'A',
			scope: false,
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			grunticon.embedIcons(grunticon.getIcons(grunticon.getCSS(grunticon.href)));
		}
	}
})();
