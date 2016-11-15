///---------------------------------------------------------------------------
/// Uglify the javascript for production ready
///---------------------------------------------------------------------------

module.exports = function buildAll(grunt) {
	var uglify = grunt.config.get('uglify') || {};

	uglify = {
		app: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: true
			},
			files: [{
				expand: true,
				cwd: grunt.const.folders.dev.app.build ,
				src: ['*.js', '**/*.js'],
				dest: grunt.const.folders.dist.app.build
			}]
		}
	};

	grunt.config.set('uglify', uglify);
};
