(function () {
	'use strict';

	angular.module('appname').config(StateConfig);
	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	/**
	* State Configuration. This is the base configuration. Each module should have its own configuration
	* @param $stateProvider
	* @constructor
	**/
	function StateConfig($stateProvider, $urlRouterProvider) {


		$stateProvider


		////////////////
		// Base state //
		////////////////


		.state('home', {
			name: 'home',
			'abstract': true,
			resolve: {
				data: ['kickstartFactory', function (kickstartFactory) {
					return kickstartFactory.getAppData();
				}]
			},
			views: {
				/** Find the views named in index.html and inject the named views**/
				'header': {
					template: '<appname-header></appname-header>'
				},
				'footer': {
					template: '<appname-footer brand="$root.brand"></appname-footer>'
				},
				'content': {
					template: '<div class="appname-app-layout__main" ui-view></div>'
				}
			}
		})

		//////////////////////////////
		// 0 - Preferences 		   //
		/////////////////////////////

		.state('home.preferences', {
				url: '/preferences',
				template: '<appname-preferences-layout></appname-preferences-layout>',
				data: {

				}
		})


		///////////////////
		// Welcone state //
		///////////////////


		.state('home.welcome', {
			url: '/welcome',
			template: '<appname-welcome-help class="appname-app-layout__main__center-main-panel"></appname-welcome-help>'
		})


		///////////////////
		// myForm state //
		///////////////////


		.state('home.myform', {
			url: '/myform',
			template: '<appname-myform-layout class=""></appname-myform-layout>'
		});


		//////////
		// Else //
		//////////


		$urlRouterProvider.when('/', '/welcome');
		$urlRouterProvider.when('', '/welcome');

	}
})();
