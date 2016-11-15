///---------------------------------------------------------------------------
/// browserify all modules
///---------------------------------------------------------------------------

module.exports = function browserify(grunt) {
	grunt.registerTask("browserifyAllModules", "browserify all modules", function(target) {

		// read all subdirectories from your modules folder
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {

				var browserify = grunt.config.get('browserify') || {};
				var moduleName = dir.substr(dir.lastIndexOf('/') + 1);

				var sources = [dir + '/**/index.js', dir + '/**/*-template.html', '!' + dir + '/**/_*.js', '!' + dir + '/**/Gruntfile.js'];
				var dest = grunt.const.folders.dev.app.modules + moduleName + '.js';

				browserify[dir] = {
					options: {
						transform: ['stringify', 'browserify-angular-injector', 'browserify-shim'],
						browserifyOptions: {
							watch: true,
							debug: true
						}
					},
					src: sources,
					dest: dest
				};

				grunt.config.set('browserify', browserify);
		});
		// when finished run the concatinations
		grunt.task.run('browserify');
	});
};
