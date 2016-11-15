(function() {
	'use strict';

	angular
	.module('yoda.dashboard.helpers.stringHelper')
	.service('yodaStringHelperService', YodaStringHelperService);

	function YodaStringHelperService() {
		this.toCamelCase = toCamelCase;
		this.hyphenate = hyphenate;

		function toCamelCase (str) {
			return str
			.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
			.replace(/\s/g, '')
			.replace(/^(.)/, function($1) { return $1.toLowerCase(); });
		}

		function hyphenate (str) {
			return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}
	}
})();
