(function() {
	'use strict';

	var _ = require('lodash');

	angular
	.module('yoda.dashboard.modulesService')
	.service('yodaDashboardModulesService', yodaDashboardModulesService);

	yodaDashboardModulesService.$inject = ['$http', '$q'];

	function yodaDashboardModulesService($http, $q) {
		/*jshint validthis:true */
		this.getMenuTree = getMenuTree;
		this.getAppData = getAppData;
		this.options = {};

		var appData = {};
		var treeFile = 'dashboard/data.json';

		/*jshint validthis: true */
		var self = this;

		function getAppData() {
			var deferred = $q.defer();

			if (appData && appData.length > 0) {
				deferred.resolve(appData);
			} else {
				getMenuTree().then(function() {
					deferred.resolve(appData);
				});
			}
			return deferred.promise;
		}

		function getMenuTree() {
			var deferred = $q.defer();
			$http.get(treeFile).success(function(data){
				this.options = data.dashboardOptions;
				appData = _.pick(data, function(value, key) {
					return !_.startsWith(key, "dashboardOptions");
				});
				deferred.resolve(appData);
			}.bind(self));
			return deferred.promise;
		}
	}
})();
