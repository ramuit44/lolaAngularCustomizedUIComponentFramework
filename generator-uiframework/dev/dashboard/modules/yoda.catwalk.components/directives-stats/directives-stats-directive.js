(function yodaDirectivesStatsDirective() {
	'use strict';

	var _ = require('lodash');

	angular.module('yoda.catwalk.components.directivesStats', []).directive('yodaDirectivesStats', directivesStats);

	directivesStats.$inject = [];

	function directivesStats() {
		var directive = {
			restrict: 'EA',
			template: require('./directives-stats-template.html'),
			scope: {
				appData: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.modulesNumber = 0;
			scope.componentsNumber = 0;
			scope.specsNumber = 0;

			scope.$watch('appData', function(newValue, oldValue) {
				countModulesAndComponents(scope.appData);
			});

			function countModulesAndComponents(data) {
				var modules = 0;
				var components = 0;

				for( var key in scope.appData ) {
					if( scope.appData.hasOwnProperty(key) ) {
						++modules;

						for( var subKey in scope.appData[key].components ) {
							if( scope.appData[key].components.hasOwnProperty(subKey) ) {
								++components;
							}
						}

					}
				}

				scope.modulesNumber = modules;
				scope.componentsNumber = components;

				console.log(data);
			}

			// scope.updateStats = function () {
			// 	console.log(scope.appData);
			// };
		}
	}
})();
