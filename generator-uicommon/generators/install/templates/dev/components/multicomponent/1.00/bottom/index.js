(function multicomponentInit() {
	'use strict';

	// declare the component angular module, you can inject dependencies here
	angular.module('appname.common.multicomponent.bottom', []);

	// Require your components here
	require('./bottom-directive.js');

}());
