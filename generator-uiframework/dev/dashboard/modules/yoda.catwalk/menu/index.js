(function indexMenu() {
	'use strict';

	require('../data');

	var componentsModule = angular.module('yoda.catwalk.menu', ['yoda.catwalk.data']);

	// var service = require('./menu-service.js');
	require('./menu-directive.js');
}());
