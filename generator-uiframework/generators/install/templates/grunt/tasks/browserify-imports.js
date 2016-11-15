///---------------------------------------------------------------------------
/// browserifyImports all modules
///---------------------------------------------------------------------------

module.exports = function browserifyImports(grunt) {
	var camelCase = require('camel-case');

	grunt.registerTask("browserifyImports", "Create an _index.js for the module at the root", function() {
		// read all subdirectories from your modules folder
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {
			var moduleName = getDirName(dir);
			var components = [];

			var componentsRequireStream = '// StartRequire\n';

			function getDirName(href) {
				return href.substr(href.lastIndexOf('/') + 1);
			}
			// loop on all Components folder
			grunt.file.expand(dir + "/*").forEach(function (subDir) {
				var submoduleName = getDirName(subDir);
				if(grunt.file.isDir(subDir)) {

					// if there is a directive then we add it as an Angular module
					if(grunt.file.exists(subDir + '/' + submoduleName + '-directive.js') || grunt.file.exists(subDir + '/multicomponent.txt') ||  grunt.file.exists(subDir + '/' + submoduleName + '-service.js') || grunt.file.exists(subDir + '/' + submoduleName + '-filter.js') || grunt.file.exists(subDir + '/' + submoduleName + '-factory.js')) {

						var componentName = camelCase(submoduleName);
						components.push(moduleName + '.' + componentName);
					}
					// Require all folders with an index.js
					if(grunt.file.exists(subDir + '/index.js')) {
						componentsRequireStream = componentsRequireStream + '\trequire(\'./' + submoduleName + '\');\n';
					}
				}
			});

			var angularModuleDependencies = '\tvar modules = ' + JSON.stringify(components) + ';\n';
			componentsRequireStream = componentsRequireStream + angularModuleDependencies + '\t// EndRequire';

			var fileName = '/index.js';
			var fileUrl = dir + fileName;
			var fileContent = '';

			// if no index.js file found for this module
			if(!grunt.file.exists(dir + fileName)) {
				// get the template
				fileContent = grunt.file.read('grunt/tasks/templates/browserify-imports.js', { encoding: 'utf8' });
				fileContent = fileContent.replace(/module.name/g, moduleName).replace(/moduleName/g, camelCase(moduleName));
			} else {
				// get the index.js file for this module as a string
				fileContent = grunt.file.read(dir + '/' + fileName, { encoding: 'utf8' });
			}

			fileContent = fileContent.replace(/\/\/ StartRequire([\s\S]*?)EndRequire/, componentsRequireStream);

			// Create or edit the index.js file
			grunt.file.write(dir + fileName, fileContent);
		});

	});
};
