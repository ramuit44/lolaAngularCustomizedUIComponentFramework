///---------------------------------------------------------------------------
/// Check all the javascript files for errors
///---------------------------------------------------------------------------

module.exports = function jshint(grunt){
	var jshint = {
		components: [
			grunt.const.folders.dev.app.modules + '**/*.js',
			'!' + grunt.const.folders.dev.app.modules + '**/_*.js',
			'!' + grunt.const.folders.dev.app.modules + 'gui1.lib/**/*.js'
		],
		dashboard: [
			grunt.const.folders.dev.dashboard.modules + '**/*.js',
			'!' + grunt.const.folders.dev.dashboard.modules + '**/_*.js'
		],
		jshintrc: true
	};
	grunt.config.set('jshint', jshint);
};
