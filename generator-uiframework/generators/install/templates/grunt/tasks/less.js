///---------------------------------------------------------------------------
/// Compile less to css
///---------------------------------------------------------------------------

module.exports = function lessModules(grunt) {

	var less = grunt.config.get('less') || {};

	less["dashboard"] = {
		options: {
			plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions", 'IE 11' ]}) ],
			sourceMap: true,
			sourceMapBasepath: './'
		},
		files: {}
	};
	var dashboardSrc = grunt.const.folders.dev.dashboard.modules + 'yoda.app/index.less';
	var dashboardDist = grunt.const.folders.dev.dashboard.build + 'yoda.app.css';
	less["dashboard"].files[dashboardDist] = dashboardSrc;

	for (var i = 0; i < grunt.const.brands.length; i++) {
		var brand = grunt.const.brands[i];
		less[brand] = {
			options: {
				plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions", 'IE 11' ]}) ],
				sourceMap: true,
				sourceMapBasepath: './',
				sourceMapRootpath: './'
			},
			files: {}
		};
		var lessDevSrc = grunt.const.folders.dev.app.modules + grunt.const.appPrefix + '.app/index.less';
		var lessDevDest = grunt.const.folders.dev.app.build + brand + '/css/' + grunt.const.appPrefix  + '.app.css';
		less[brand].files[lessDevDest] = lessDevSrc;
	}

	grunt.config.set('less', less);

	// console.log(grunt.config.get('less'));
};
