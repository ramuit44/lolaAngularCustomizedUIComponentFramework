///---------------------------------------------------------------------------
/// Start unit tests
///---------------------------------------------------------------------------

module.exports = function karma(grunt) {
	var karma = {
		unit: {
			configFile: grunt.const.files.karma,
			autoWatch: false,
			singleRun: true
		},
		watch: {
			configFile: grunt.const.files.karma,
			autoWatch: true,
			singleRun: false
		}
	};

	grunt.config.set('karma', karma);
};
