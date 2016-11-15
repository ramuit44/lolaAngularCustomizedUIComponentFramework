describe('appname.preferences', function() {
	var $compile,
	$rootScope;

	// Load the module, which contains Preferences-form
	beforeEach(angular.mock.module('appname.preferences'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	// example nested describe
	describe('display parameter myParam', function() {

		// test example
		// it('display "Hello world" when my-param="Hello world"', function() {
		// 	// Compile a piece of HTML containing Preferences-form
		// 	var element = $compile('<appname-preferences-form my-param="Hello world"></appname-preferences-form>')($rootScope);
		//
		// 	$rootScope.$digest();
		//
		// 	expect(element.html()).toContain('Hello world');
		// });

	});

});
