'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var camelCase = require('camel-case');
var capitalize = require('capitalize');
var walk = require('fs-walk').walk;
var fs = require('fs');
var fs = require('fs-extra');
var jsonfile = require('jsonfile');

var AngularDirectiveGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.sourceRoot(path.join(__dirname, 'templates/'));
		this.options = {
			author: {
				name: this.user.git.name(),
				email: this.user.git.email()
			}
		};
	},

	////////////////////////////////////////////////////////
	//           Ask the app prefix
	////////////////////////////////////////////////////////

	askProjectPrefix: function () {
		var done = this.async();

		this.prompt({
			type: 'input',
			name: 'appPrefix',
			message: 'Application prefix (example: appname) ?',
			default: 'myapp'
		}, function (result) {
			this.options.appPrefix = result.appPrefix;
			done();
		}.bind(this));
	},

	////////////////////////////////////////////////////////
	//             Get the config from yo.da.json
	////////////////////////////////////////////////////////

	getYodaOptions : function() {
		var filename = 'yo.da.json';
		var config = JSON.parse(fs.readFileSync(filename), 'utf8');

		//console.log("here 1");
		console.log(config.appFolder);
		console.log(config.componentsFolder);

		this.options.appFolder = config.appFolder;
		this.options.componentsFolder = config.componentsFolder;
		this.options.distFolder = config.distFolder;

		config['appPrefix'] = this.options.appPrefix;

		jsonfile.writeFileSync(filename, config, {spaces: 2});
	},

	////////////////////////////////////////////////////////
	//                     Templating
	////////////////////////////////////////////////////////

	writing: {
		dest: function () {

			console.log("here");

			console.log(this.options.appPrefix);
			// recursive function to rename and copy folder and files for the app
			renameAndCopyModules(path.join(this.sourceRoot(), 'app', 'modules'), path.join(this.destinationRoot(), 'dev', 'app', 'modules'), this.options.appPrefix);

			// recursive function to rename and copy folder and files for the app
			copyCommonModules(path.join(this.destinationRoot(), 'commonModules', 'dev'), path.join(this.destinationRoot(), 'dev', 'app', 'modules'), this.options.appPrefix);

			// recursive function to rename and copy folder and files for the dashboard
			renameAndCopyModules(path.join(this.sourceRoot(), 'dashboard', 'modules'), path.join(this.destinationRoot(), 'dev', 'dashboard', 'modules'), this.options.appPrefix);

			// copy index.html to /dev
			renameAndCopyModules(path.join(this.sourceRoot(), 'pages'), path.join(this.destinationRoot(), 'dev'), this.options.appPrefix);
		}
	},

	end: function () {
		// this.installDependencies();
	}
});

function renameAndCopyModules(sourceRoot, dest, appPrefix) {
	//////////////////////////////////////////////////////
	//   Copy the app modules and replace the app prefix
	//////////////////////////////////////////////////////

	var that = this;

	copyFiles(sourceRoot, dest, appPrefix);


	function copyFiles(rootModules, destinationRoot, appPrefix) {
		// copy all the files for theses directory
		walk(rootModules, function (basedir, filename, stat, next) {
			var relativePath = basedir.replace(rootModules , '');
			var filePath = path.join(basedir, filename);

			if (stat.isDirectory()) {
				var newModuleName = filename.replace('appname', appPrefix);
				fs.mkdirsSync(path.join(destinationRoot, newModuleName), next);
				copyFiles(path.join(rootModules, filename), path.join(destinationRoot, newModuleName), appPrefix);
				return;
			}

			fs.readFile(filePath, function (err, stream){
				if (err) {
					return console.error(err);
				}

				var fileString = stream.toString();
				var writeFilePath = path.join(destinationRoot, relativePath, filename);

				// replace strings here
				fileString = fileString.replace(/\/appname\//g, appPrefix);
				fileString = fileString.replace(/appname/g, appPrefix);

				fs.writeFile(writeFilePath, fileString, next);
			});

		}, function(err) {
			// console.error(err);
		});
	}

}


function copyCommonModules(sourceRoot, dest, appPrefix) {
	//////////////////////////////////////////////////////
	//   Copy the app modules and replace the app prefix
	//////////////////////////////////////////////////////

	var that = this;

	copyCommonFiles(sourceRoot, dest, appPrefix);


	function copyCommonFiles(rootModules, destinationRoot, appPrefix) {
		// copy all the files for theses directory
		walk(rootModules, function (basedir, filename, stat, next) {
			var relativePath = basedir.replace(rootModules , '');
			var filePath = path.join(basedir, filename);

			if (stat.isDirectory()) {
				var newModuleName = filename.replace('appname', appPrefix);
				fs.mkdirsSync(path.join(destinationRoot, newModuleName), next);
				copyCommonFiles(path.join(rootModules, filename), path.join(destinationRoot, newModuleName), appPrefix);
				return;
			}

			fs.readFile(filePath, function (err, stream){
				if (err) {
					return console.error(err);
				}

				var fileString = stream.toString();
				var writeFilePath = path.join(destinationRoot, relativePath, filename);

				// replace strings here
				fileString = fileString.replace(/\/appname\//g, appPrefix);
				fileString = fileString.replace(/appname/g, appPrefix);

				fs.writeFile(writeFilePath, fileString, next);
			});

		}, function(err) {
			// console.error(err);
		});
	}

}




module.exports = AngularDirectiveGenerator;
