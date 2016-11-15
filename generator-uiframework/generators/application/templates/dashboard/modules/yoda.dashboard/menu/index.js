(function indexMenu() {
	'use strict';

	require('../modules-service');

	var componentsModule = angular.module('yoda.dashboard.menu', ['yoda.dashboard.modulesService']);

	// var service = require('./menu-service.js');
	require('./menu-directive.js');
}());
