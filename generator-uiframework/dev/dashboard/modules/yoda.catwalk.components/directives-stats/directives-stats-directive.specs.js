describe('yoda.catwalk.components', function() {
	var $compile,
	$rootScope;

	// Load the module, which contains Directives-stats
	beforeEach(angular.mock.module('yoda.catwalk.components'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	// example nested describe
	describe('display parameter myParam', function() {


	});

});
