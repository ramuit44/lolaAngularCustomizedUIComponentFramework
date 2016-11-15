(function homePageInit() {
	'use strict';

	require('../modules-service');

	// declare the component angular module, you can inject dependencies here
	angular.module('yoda.dashboard.homePage', []);

	// Require your components here
	require('./home-page-directive.js');

}());
