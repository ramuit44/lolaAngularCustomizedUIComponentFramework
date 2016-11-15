(function() {
	'use strict';

	angular
	.module('yoda.dashboard.componentPage')
	.service('yodaDashboardComponentService', yodaDashboardComponentService);

	yodaDashboardComponentService.$inject = ['$http', '$q'];

	function yodaDashboardComponentService($http, $q) {
		/*jshint validthis:true */
		this.getComponentPage = getComponentPage;
		this.getComponentMock = getComponentMock;
		this.selectedComponent = selectedComponent;
		var pagesCache = {};
		var mocksCache = {};
		var selectedComponent = {};
		var pagesUrl = 'dashboard/pages/';

		function getComponentMock(componentName, moduleName) {
			var deferred = $q.defer();
			moduleName = moduleName.replace('.', '-');

			// check if the mock is already loaded and in the cache
			if(mocksCache[moduleName + '-' + componentName]) {
				// get the main content of the page from the cache
				deferred.resolve(mocksCache[moduleName + '-' + componentName]);
				return deferred.promise;

			} else {
				// get the mock from the folder
				var mockUrl = pagesUrl + moduleName + '-' + componentName + '-mock.js';
				$http.get(mockUrl).success (function(data){
					mocksCache[moduleName + '-' + componentName] = data;
					deferred.resolve(data);
				});

				return deferred.promise;
			}
		}

		function getComponentPage(componentName, moduleName) {
			var deferred = $q.defer();
			moduleName = moduleName.replace('.', '-');

			// check if the page is already loaded and in the cache
			if(pagesCache[moduleName + '-' + componentName]) {
				// get the main content of the page from the cache
				deferred.resolve(pagesCache[moduleName + '-' + componentName]);
				return deferred.promise;

			} else {
				// get the page from the server
				var pageUrl = pagesUrl + moduleName + '-' + componentName + '-page.html';

				$http.get(pageUrl).success (function(data){
					var mainTagStart = '<main';
					var mainTagEnd = 'main>';
					var mainContent = '\t' +  data.substring(data.indexOf(mainTagStart), data.indexOf(mainTagEnd) + mainTagEnd.length);
					pagesCache[moduleName + '-' + componentName] = mainContent;
					selectedComponent = mainContent;
					deferred.resolve(selectedComponent);
				});

				return deferred.promise;
			}
		}
	}
})();
