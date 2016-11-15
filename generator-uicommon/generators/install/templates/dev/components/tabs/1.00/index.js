(function tabsInit() {
	'use strict';

	// declare the component angular module, you can inject dependencies here
	angular.module('appname.common.tabs', []);

	// require('../../../../libs/ui-bootstrap-custom-build/ui-bootstrap-custom-0.14.3.js');
	require('./ui-boostrap-tabs-tpls.js');

	// Require your components here
	require('./tabs-directive.js');

}());
