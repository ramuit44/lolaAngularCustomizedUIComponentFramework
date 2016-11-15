// (function() {
// 	'use strict';
//
// 	var _ = require('lodash');
//
// 	angular
// 	.module('yoda.catwalk.menu')
// 	.service('CatwalkMenuService', CatwalkMenuService);
//
// 	CatwalkMenuService.$inject = ['$http', '$q'];
//
// 	function CatwalkMenuService($http, $q) {
// 		this.getMenuTree = getMenuTree;
// 		this.appData = {};
// 		var treeFile = '/catwalk/tree.json';
//
// 		function getMenuTree() {
// 			/*jshint validthis: true */
// 			var self = this;
//
// 			var deferred = $q.defer();
// 			$http.get(treeFile).success (function(data){
// 				self.appData = _.pick(data, function(value, key) {
// 					return !_.startsWith(key, "yoda");
// 				});
// 				deferred.resolve(self.appData);
// 			});
// 			return deferred.promise;
// 		}
// 	}
// })();
