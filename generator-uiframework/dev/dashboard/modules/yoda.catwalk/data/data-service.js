(function() {
	'use strict';

	var _ = require('lodash');

	angular
	.module('yoda.catwalk.data')
	.service('CatwalkDataService', CatwalkDataService);

	CatwalkDataService.$inject = ['$http', '$q'];

	function CatwalkDataService($http, $q) {
		this.getMenuTree = getMenuTree;
		this.getAppData = getAppData;
		var appData = {};

		var treeFile = '/catwalk/tree.json';

		function getAppData() {
			/*jshint validthis: true */
			var self = this;
			var deferred = $q.defer();

			if (appData && appData.length > 0) {
				deferred.resolve(appData);
			} else {
				getMenuTree().then(function() {
					deferred.resolve(appData);
					return appData;
				});
			}
			return deferred.promise;
		}

		function getMenuTree() {
			/*jshint validthis: true */
			var self = this;
			var deferred = $q.defer();
			$http.get(treeFile).success (function(data){
				appData = _.pick(data, function(value, key) {
					return !_.startsWith(key, "yoda");
				});
				deferred.resolve(appData);
			});
			return deferred.promise;
		}
	}
})();
