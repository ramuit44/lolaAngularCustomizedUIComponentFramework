(function routesInit() {
	angular.module('yoda.catwalk').run(
		[          '$rootScope', '$state', '$stateParams',
		function ($rootScope,   $state,   $stateParams) {
			// using rootScope is a bad idea
			// $rootScope.$state = $state;
			// $rootScope.$stateParams = $stateParams;
		}
	]
)
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,   $urlRouterProvider, $locationProvider) {

	/////////////////////////////
	// Redirects and Otherwise //
	/////////////////////////////

	// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
	// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
	// $urlRouterProvider.otherwise('/home');

	//////////////////////////
	// State Configurations //
	//////////////////////////

	// Use $stateProvider to configure your states.
	$stateProvider

	// .state('root', {
	// 	abstract: true,
	// 	url: '/'
	// })

	//////////
	// Home //
	//////////

	.state("home", {
		// Use a url of "/" to set a state as the "index".
		url: "^",
		template: '<yoda-home-page></yoda-home-page>',
		data: {
        headerTitle: 'Welcome in the Catwalk'
    	}
	})

	///////////////
	// Component //
	///////////////

	.state("component", {
		url: "/component/:moduleName/:componentName",
		template: '<yoda-catwalk-component></yoda-catwalk-component>',
		data: {
        headerTitle: 'Components loader'
    	}
	})

	///////////////////
	// Code coverage //
	///////////////////

	.state("coverage", {
		url: "/coverage",
		template: '<yoda-coverage-page></yoda-coverage-page>',
		data: {
		  headerTitle: 'Code coverage'
		}
	});


	// Enable html5Mode
	// $locationProvider.html5Mode({
	// 	enabled: true
	// });

	$urlRouterProvider.when('/', '/home');
}
]
);


})();
