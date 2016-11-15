(function yodaComponentCodeEditorDirective() {
	'use strict';

	var _ = require('lodash');

	var componentsModule = angular.module('yoda.dashboard.components.componentCodeEditor', []);
	componentsModule.directive('yodaComponentCodeEditor', componentCodeEditor);

	componentCodeEditor.$inject = [];

	function componentCodeEditor() {
		var directive = {
			restrict: 'EA',
			template: require('./component-code-editor-template.html'),
			scope: {
				selectedComponent: '=',
				run: '&',
				reset: '&'
			},
			controller: ['$scope', '$element', controllerFunc]
		};

		return directive;

		function controllerFunc(scope, element) {
			scope.isScopeInspectorLoaded = false;

			scope.updateViewFromEditor = function() {
				scope.updateParent();
			};

			function censor(key, value) {
				if (value && typeof value === "object" && value.parent) {
					value.parent = value.parent.name;
				}
				return value;
			}

			function removeAngularScopeVariable (scopeVariables) {
				var cleanScope = {};
				for(var k in scopeVariables) {
					if (k.indexOf('$') === -1 && k !== 'myForm') {
						if (typeof scopeVariables[k] === 'string' && scopeVariables[k].length > 20) {
							cleanScope[k] = scopeVariables[k].slice(0,20) + '...';
						} else {
							cleanScope[k] = scopeVariables[k];
						}
					}
				}
				return cleanScope;
			}

			scope.componentScope = {};
			var allScopes = {};

			function getScopeData (mainScope, iteration) {
				for(var k in mainScope) {
					if (k.indexOf('$') === -1 && typeof k !== 'object') {
						if(!allScopes[mainScope.$id]) {
							allScopes[mainScope.$id] = {};
						}
						allScopes[mainScope.$id][k] = mainScope[k];
					}
				}
				if (iteration < 10 && mainScope && mainScope.$$childTail) {
					getScopeData(mainScope.$$childTail, iteration + 1);
				}
			}

			var init = false;
			scope.loadScopeData = function () {
				scope.isScopeInspectorLoaded = true;
				allScopes = {};
				var mainScope = angular.element('main').scope();
				getScopeData(mainScope, 0);

				// console.log(allScopes);
				var cache = [];
				scope.componentScope = JSON.stringify(allScopes, function (key, value) {

					if (typeof value === 'object' && value !== null) {
						if (cache.indexOf(value) !== -1) {
							// Circular reference found, discard key
							return;
						}
						// Store value in our collection
						cache.push(value);
					}
					return value;
				}, '\t');
				cache = null;

				// if (!mainScope.$$childTail) {
				// 	mainScope['child'] =
				// }

				// var cache = [];
				// scope.componentScope = JSON.stringify(inspector, removeCircularDependencies, '\t');
				// cache = null; // Enable garbage collection
			};
			// scope.loadScopeData();

			function removeCircularDependencies (key, value) {
				var cache = [];
				if (typeof value === 'object' && value !== null) {
					if (cache.indexOf(value) !== -1) {
						// Circular reference found, discard key
						return;
					}
					// Store value in our collection
					cache.push(value);
				}
				return value;
			}

			scope.updateScopeData = function () {

			};
		}
	}
})();
