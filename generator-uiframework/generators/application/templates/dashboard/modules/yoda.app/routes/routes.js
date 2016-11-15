(function routesInit() {
	angular.module('yoda.dashboard').run(
		['$rootScope', '$state', '$stateParams',
		function ($rootScope,   $state,   $stateParams) {}
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


	//////////
	// Home //
	//////////

	.state("yoda", {
		// Use a url of "/" to set a state as the "index".
		url: "^",
		template: '<yoda-home-page></yoda-home-page>',
		data: {
			headerTitle: 'Welcome in the dashboard'
		}
	})

	///////////////
	// Component //
	///////////////

	.state("component", {
		url: "/component/:moduleName/:componentName",
		template: '<yoda-dashboard-component></yoda-dashboard-component>',
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
	})

	////////////////////
	// Docs				//
	////////////////////

	.state("cem", {
		url: "/cem",
		template: '<yoda-dashboard-cem></yoda-dashboard-cem>',
		data: {
			headerTitle: 'CEM'
		}
	})

	.state("angularnaming", {
		url: "/angular-naming",
		template: '<yoda-home-page></yoda-home-page>',
		data: {
			headerTitle: 'Angular naming conventions'
		}
	});

	// Enable html5Mode
	// $locationProvider.html5Mode({
	// 	enabled: true
	// });

	// $urlRouterProvider.when('/', '/');
}
]
);


})();
