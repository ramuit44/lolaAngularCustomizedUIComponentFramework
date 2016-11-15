///---------------------------------------------------------------------------
/// Minify css files and move them to prod
///---------------------------------------------------------------------------

module.exports = function cssmin(grunt){
	var cssmin = {
		app: {
			files: [{
				expand: true,
				cwd: grunt.const.folders.dev.app.build,
				src: ['**/*.css', '!**/*.css.map' ],
				dest: grunt.const.folders.dist.app.build
			}]
		},
		dashboard: {
			files: [{
				expand: true,
				cwd: grunt.const.folders.dev.dashboard.build,
				src: ['**/*.css', '!**/*.css.map' ],
				dest: grunt.const.folders.dist.dashboard.build
			}]
		}
	};
	grunt.config.set('cssmin', cssmin);
};
