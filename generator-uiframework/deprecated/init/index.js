'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var fs = require('fs-extra');
var jsonfile = require('jsonfile');

var initGenerator =  yeoman.generators.Base.extend({

	prompting: function () {
		this.sourceRoot(path.join(__dirname, 'templates/'));
		this.file = 'yo.da.json';
		// test if the yoda config file exist in the folder
		try {
			this.configs = jsonfile.readFileSync(this.file);
		} catch (e) {
			this.configs = {};
			fs.closeSync(fs.openSync(this.file, 'w'));
		}
	},

	// // Ask the project name
	// askProjectName: function () {
	// 	var done = this.async();
	//
	// 	this.prompt({
	// 		type: 'input',
	// 		name: 'appPrefix',
	// 		message: 'Application prefix (example: appname) ?',
	// 		default: 'myapp'
	// 	}, function (result) {
	// 		this.configs.appPrefix = result.appPrefix;
	// 		done();
	// 	}.bind(this));
	// },

	// Ask the angular version
	askAngularVersion: function () {
	   var done = this.async();
	   var defaultValue = this.configs.angularVersion ? this.configs.angularVersion : '1.4.5';

	   this.prompt({
	      type: 'input',
	      name: 'angularVersion',
	      message: "Angular version ?",
	      default: defaultValue
	   }, function (result) {
	      this.configs.angularVersion = result.angularVersion;
	      done();
	   }.bind(this));
	},

	// Ask the app folder
	askAppFolder: function () {
		var done = this.async();
		var defaultValue = this.configs.appFolder ? this.configs.appFolder : './app';

		this.prompt({
			type: 'input',
			name: 'appFolder',
			message: 'App folder (example: ./app ) ?',
			default: defaultValue
		}, function (result) {
			this.configs.appFolder = result.appFolder;
			done();
		}.bind(this));
	},

	// Ask the build folder
	askBuildFolder: function () {
		var done = this.async();
		var defaultValue = this.configs.distFolder ? this.configs.distFolder : '/dist/';

		this.prompt({
			type: 'input',
			name: 'distFolder',
			message: 'build folder ?',
			default: defaultValue
		}, function (result) {
			this.configs.distFolder = result.distFolder;
			done();
		}.bind(this));
	},

	// Ask the components folder
	askComponentsFolder: function () {
		var done = this.async();
		var defaultValue = this.configs.componentsFolder ? this.configs.componentsFolder : '/modules/';

		this.prompt({
			type: 'input',
			name: 'componentsFolder',
			message: 'components folder ?',
			default: defaultValue
		}, function (result) {
			this.configs.componentsFolder = result.componentsFolder;
			done();
		}.bind(this));
	},

	writing: function () {
		this.file = 'yo.da.json';

		this.configs.lazyload = true;
		this.configs.angularVersion = '1.4.8';
		this.configs.appFolder = '/app';
		this.configs.distFolder = '/build/';
		this.configs.componentsFolder = '/modules/';

		this.configs.brands = ["WBC", "STG", "BOM", "BSA"];

		jsonfile.writeFileSync(this.file, this.configs, {spaces: 2});
	}
});

module.exports = initGenerator;
