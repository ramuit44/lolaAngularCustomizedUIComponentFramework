///---------------------------------------------------------------------------
/// Copy all the brand assets for the specified brand
///---------------------------------------------------------------------------

module.exports = function copyComponentsPages(grunt) {
	grunt.registerTask("brandAssets", "Copy all the assets for the specified brand", function(brand) {

		if (!brand) {
			brand = 'WBC';
		}

		var copy = grunt.config.get('copy') || {};

		copy[brand] = {
				files: [
					{
						expand: true,
						cwd: grunt.const.folders.brands + 'GUI-blend-' + brand + '/assets/',
						src: ['**', '!js/**'],
						dest: grunt.const.folders.dev.app.build + brand + '/',
					}
				]
		};

		grunt.config.set('copy', copy);
		grunt.task.run('copy:' + brand);
	});
};
