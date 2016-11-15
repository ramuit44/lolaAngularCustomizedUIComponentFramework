(function() {
	'use strict';
	angular.module('yoda.catwalk.componentPage').directive('yodaCatwalkComponent', catwalkComponent);

	catwalkComponent.$inject = ['$state', '$compile', 'YodaCatwalkComponentService', '$ocLazyLoad'];

	function catwalkComponent($state, $compile, yodaCatwalkComponentService, $ocLazyLoad) {
		var directive = {
			restrict: 'EA',
			template: require('./component-page-template.html').trim(),
			scope: {},
			controller: ['$scope', '$element', controllerFunc],
			controllerAs: 'ctrl'
		};

		return directive;

		function controllerFunc(scope, el) {
			/*jshint validthis: true */
			var vm = this;

			var element = el;
			var componentWrapperSelector = '._yoda-catwalkComponent-component';
			var moduleName = $state.params.moduleName;
			var componentName = $state.params.componentName;

			vm.selectedComponent = '';

			vm.getComponentPage = function() {
				// get the mock data
				yodaCatwalkComponentService.getComponentMock(componentName, moduleName).then(function(data) {
					scope.mock = scope.$eval(data);
				});

				// get the page
				yodaCatwalkComponentService.getComponentPage(componentName, moduleName).then(function(result){
					compileElement(result);
				});
			};

			vm.runEditedComponent= function() {
				compileElement(vm.selectedComponent);
			};

			function compileElement(tag) {
				var compiled = $compile(tag)(scope);
				element.find(componentWrapperSelector).html(compiled);
				vm.selectedComponent = tag;
			}

			scope.baseUrl = '../';
			scope.getTemplateUrl = function() {
				return scope.baseUrl + 'app/dist/templates/' + moduleName.replace('.', '-') + '-' + componentName + '-template.html';
			};

			function lazyLoadTheComponentModule() {
				// don't load the same module multiple time
				if (!$ocLazyLoad.isLoaded(moduleName)) {
					$ocLazyLoad.load({
						name: moduleName,
						files: ['../app/dist/' + moduleName + '.css', '../app/dist/' + moduleName + '.js']
					}).then(function sucess() {
						vm.getComponentPage();
					}, function error(e) {
						console.error(e);
					});
				} else {
					vm.getComponentPage();
				}
			}
			lazyLoadTheComponentModule();
		}
	}
})();
