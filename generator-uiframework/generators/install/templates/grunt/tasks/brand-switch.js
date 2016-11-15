///---------------------------------------------------------------------------
/// Brand Switching for less files
/// ex: grunt brandSwitch:STG
///---------------------------------------------------------------------------

module.exports = function brandSwitch(grunt) {

	grunt.registerTask("brandSwitch", "Change the brand for the gui.less files", function(newBrand) {

		// var newBrand = grunt.option('brand');
		if (!newBrand) {
			console.error('Brand not find, loading default brand: WBC');
			newBrand = 'WBC';
		}

		// var colorsFile = grunt.file.read('app/modules/gui.components/_styles/_colors.less');
		var colorsFile = grunt.file.read(grunt.const.folders.dev.app.modules + 'gui.blend/styles/_colors.less');

		// get last word between brackets
		var oldBrand = colorsFile.match(/\(([^)]*)\)[^(]*$/)[1];
		var regexReplaceBrand = /\(([^)]*)\)[^(]*$/;

		console.log('new regex : ' + regexReplaceBrand);
		console.log('new brand : ' + newBrand);

		var replace = {
			brand: {
				src: [ grunt.const.folders.dev.app.modules + 'gui.blend/**/*.less', '!' + grunt.const.folders.dev.app.modules + 'gui.blend/**/index.less'],	// source files array (supports minimatch)
				overwrite: true,
				replacements: [{
					from: regexReplaceBrand,
					to: '(' + newBrand + ');'
				}
			]
		}
	};

	grunt.config.set('replace', replace);
	grunt.task.run('replace');
});
};
