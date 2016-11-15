(function homePageInit() {
	'use strict';

	require('../data');

	// declare the component angular module, you can inject dependencies here
	angular.module('yoda.catwalk.homePage', ['yoda.catwalk.data']);

	// Require your components here
	// require('./home-page-service.js');
	require('./home-page-directive.js');

}());
