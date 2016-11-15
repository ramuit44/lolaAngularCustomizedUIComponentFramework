///---------------------------------------------------------------------------
/// Read configs from yo.da.json
///---------------------------------------------------------------------------

module.exports = function configs(grunt) {
	var fs = require('fs');

	// default value

	var devFolder = './dev';
	var distFolder = './target/dist';
	var appFolder = '/app';
	var dashboardFolder = '/dashboard';
	var moduleFolder = '/modules/';
	var buildFolder = '/build/';
	var brands = ["WBC", "STG", "BOM", "BSA"];
	var appPrefix = '';
	var lazyload = false;
	//Move to generators\application\index.js to prompt as user input if required.
	//var groupIdPrefix = 'westpac.mbdo';
	//var snapshotRepoId = 'serviceonline';
	//var snapshotRepoName = 'serviceonline';
	//var snapshotRepoUrl = 'http://sso-nexus.intranet.westpac.com.au:8081/nexus/content/repositories/serviceonline';

	try {
		var obj = JSON.parse(fs.readFileSync('yo.da.json', 'utf8'));
		console.log('Loading Yoda configuration: ' + obj.appFolder + obj.componentsFolder);
		appFolder = obj.appFolder;
		moduleFolder = obj.componentsFolder;
		buildFolders = obj.buildFolders;
		brands = obj.brands;
		appPrefix = obj.appPrefix;
		lazyload = obj.lazyload;
	} catch (e) {
		console.error('Yo.da.json not found. Please use: yo da:init.');
		console.error(e);
	}

	grunt.const = {
		appPrefix: appPrefix,
		lazyload: lazyload,
		brands: brands,
		defaultBrand: brands[0],
		server: {
			port: 9001,
			livereload: true
		},
		folders: {
			dev: {
				root: devFolder,
				app: {
					root: devFolder + appFolder,
					modules: devFolder + appFolder + moduleFolder,
					build: devFolder + appFolder + buildFolder
				},
				dashboard: {
					root: devFolder + dashboardFolder,
					modules: devFolder + dashboardFolder + moduleFolder,
					build: devFolder + dashboardFolder + buildFolder
				}
			},
			dist: {
				root: distFolder,
				app: {
					root: distFolder + appFolder,
					modules: distFolder + appFolder + moduleFolder,
					build: distFolder + appFolder + buildFolder
				},
				dashboard: {
					root: distFolder + dashboardFolder,
					modules: distFolder + dashboardFolder + moduleFolder,
					build: distFolder + dashboardFolder + buildFolder
				}
			},
			brands: './brands/'
		},
		files: {
			karma: './karma.conf.js'
		}
	};
};
