'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var fs = require('fs.extra');
var walk = require('fs-walk').walk;
var jsonfile = require('jsonfile');

var gruntGenerator =  yeoman.generators.Base.extend({
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

	writing: {
		dest: function () {

			////////////////////////////////////////////////////////
			//           Create yo.da json file
			////////////////////////////////////////////////////////

			this.file = 'yo.da.json';
			this.configs.lazyload = false;
			this.configs.angularVersion = '1.4.8';
			this.configs.appFolder = '/app';
			this.configs.distFolder = '/build/';
			this.configs.componentsFolder = '/modules/';
			this.configs.brands = ['WBC', 'STG', 'BOM', 'BSA'];

			jsonfile.writeFileSync(this.file, this.configs, {spaces: 2});

			////////////////////////////////////////////////////////
			//            Copy the required folders and files
			////////////////////////////////////////////////////////

			var that = this;
			var root = that.sourceRoot();

			that.copy(path.join(root, 'package.json'), 'package.json');
			that.copy(path.join(root, '.gitignore'), '.gitignore');
			that.copy(path.join(root, 'README.md'), 'README.md');
			that.copy(path.join(root, 'Gruntfile.js'), 'Gruntfile.js');
			that.copy(path.join(root, 'karma.conf.js'), 'karma.conf.js');

			// copy all the grunt tasks and configs
			fs.copyRecursive(path.join(root, 'grunt'), 'grunt', function() {});

			// copy the brand folder
			fs.copyRecursive(path.join(root, 'brands'), 'brands', function() {});

			// copy the content of dev folder
			fs.copyRecursive(path.join(root, 'dev'), 'dev', function() {
				console.log('done');
			});
		}
	},
	install: function () {
		this.installDependencies();
	}
});

module.exports = gruntGenerator;
