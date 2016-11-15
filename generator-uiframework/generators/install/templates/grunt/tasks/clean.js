///---------------------------------------------------------------------------
/// Clean prod and dev directories
///---------------------------------------------------------------------------

module.exports = function cleanGeneratedDirectory(grunt) {
	var clean = {
		dev: [grunt.const.folders.dev.app.build],
		dashboard: [grunt.const.folders.dev.dashboard.build],
		dist: [grunt.const.folders.dist.root]
	};
	grunt.config.set('clean', clean);
};
