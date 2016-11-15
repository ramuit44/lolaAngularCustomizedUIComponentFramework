///---------------------------------------------------------------------------
/// Compile less to css
///---------------------------------------------------------------------------

module.exports = function lessModules(grunt) {
	grunt.registerTask('lessAllModules', 'less to css for all modules', function() {

		// read all subdirectories from your modules folder
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {
			console.log(dir);

			var less = grunt.config.get('less') || {};
			var moduleName = dir.substr(dir.lastIndexOf('/') + 1);

			var lessDevDest = grunt.const.folders.dev.app.build + moduleName + '.css';
			var lessDevSrc = dir + '/index.less';

			less[dir] = {
				options: {
					plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions", 'IE 11' ]}) ],
					sourceMap: true,
				},
				files: {}
			};

			less[dir].files[lessDevDest] = lessDevSrc;
			grunt.config.set('less', less);

		});
		// when finished run the concatinations
		grunt.task.run('less');
	});
};
