///---------------------------------------------------------------------------
/// Automatic import of all components less files into their module index.less
///---------------------------------------------------------------------------

module.exports = function less_imports (grunt) {
	grunt.registerTask("lessImportsModules", "import all less file in modules index", function() {

		function getDirName(href) {
			return href.substr(href.lastIndexOf('/') + 1);
		}

		// read all subdirectories from your modules folder
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {
			var lessImports = '// StartGruntImports\n';

			// for each components folder
			grunt.file.expand(dir + "/*").forEach(function (subDir) {
				var componentName = getDirName(subDir);
				if (grunt.file.exists(subDir + '/' + componentName + '-style.less')) {
					lessImports = lessImports + '@import (once) "' + componentName + '/' + componentName + '-style.less";\n';
					// if there is an index.less, then add them to lessImports
				} else if (grunt.file.exists(subDir + '/index.less')) {
					lessImports = lessImports + '@import (once) "' + componentName + '/index.less";\n';
				}
			});

			lessImports = lessImports + '// EndGruntImports';

			var moduleIndex = dir + '/index.less';
			var fileContent = '';

			// check if index.less exist for the module
			// if doesnt exist then add
			if(grunt.file.exists(moduleIndex)) {
				fileContent = grunt.file.read(moduleIndex);
			} else {
				fileContent = grunt.file.read('grunt/tasks/templates/less-imports.js');
			}

			// Add the imports between the specified tags
			fileContent = fileContent.replace(/\/\/ StartGruntImports([\s\S]*?)EndGruntImports/, lessImports);

			// write
			grunt.file.write(moduleIndex, fileContent);
		});
	});
};
