(function() {
	'use strict';
	angular.module('yoda.dashboard.componentPage').directive('yodaDashboardComponent', dashboardComponent);

	dashboardComponent.$inject = ['$state', '$compile', 'yodaDashboardComponentService', '$ocLazyLoad', '$rootScope'];

	function dashboardComponent($state, $compile, yodaDashboardComponentService, $ocLazyLoad, $rootScope) {
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
			var componentWrapperSelector = '._yoda-dashboardComponent-component';
			var moduleName = $state.params.moduleName;
			var componentName = $state.params.componentName;

			vm.selectedComponent = '';

			vm.getComponentPage = function() {
				// get the mock data
				yodaDashboardComponentService.getComponentMock(componentName, moduleName).then(function(data) {
					scope.mock = scope.$eval(data);
				});

				// get the page
				yodaDashboardComponentService.getComponentPage(componentName, moduleName).then(function(result){
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
				return scope.baseUrl + 'app/build/templates/' + moduleName.replace('.', '-') + '-' + componentName + '-template.html';
			};

			function lazyLoadTheComponentModule(newBrand, forceReload) {
				if(!newBrand) return;

				// don't load the same module multiple time
				if (!$ocLazyLoad.isLoaded(moduleName)) {
					$ocLazyLoad.load({
						name: moduleName,
						files: ['app/build/' + $rootScope.brand + '/css/appname.app.css', 'app/build/' + moduleName + '.js'],
						cache: !forceReload
					}).then(function sucess() {
						vm.getComponentPage();
					}, function error(e) {
						console.error(e);
					});
				} else {
					//if the app don't use lazyloading
					$ocLazyLoad.load({
						name: 'app',
						files: ['app/build/' + newBrand + '/css/appname.app.css', 'app/build/appname.app.js'],
						cache: !forceReload
					});
					vm.getComponentPage();
				}
			}

			function unloadCSSModules (oldBrand) {
				$('link[href="app/build/' + oldBrand + '/css/appname.app.css"]').remove();
			}

			var checkrootScope = $rootScope.$watch('brand', function (newBrand, oldBrand) {
				unloadCSSModules(oldBrand);
				lazyLoadTheComponentModule(newBrand, newBrand !== oldBrand);
			});

			scope.$on('$destroy', function() {
				checkrootScope();
			});

			lazyLoadTheComponentModule();
		}
	}
})();
