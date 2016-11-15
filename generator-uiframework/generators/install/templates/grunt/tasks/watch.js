///---------------------------------------------------------------------------
/// Watch and trigger js or css build
///---------------------------------------------------------------------------

module.exports = function watch(grunt) {

	///---------------------------------------------------------------------------
	/// Watch app for dev
	///---------------------------------------------------------------------------

	grunt.registerTask('watch:app', "watch the app with the default brand", function () {
		var defaultBrand = grunt.const.defaultBrand;
		var watch = {
			less: {
				files: grunt.const.folders.dev.app.modules + '**/*.less',
				tasks: ['less:' + defaultBrand],
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			},
			js: {
				files: [grunt.const.folders.dev.app.modules + '**/*.js',
				grunt.const.folders.dev.app.modules + '**/*-template.html'],
				tasks: ['jshint:components', 'browserify:app', 'karma:unit'],
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			},
			pages: {
				files: grunt.const.folders.dev.app.modules + '**/*-page.html',
				tasks: ['copy:dashboardPages'],
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			}
		};

		grunt.config.set('watch', watch);
		grunt.task.run('watch');
	});

	///---------------------------------------------------------------------------
	/// Watch dashboard for dev
	///---------------------------------------------------------------------------

	grunt.registerTask('watch:dashboard-app', "watch the dashboard", function () {
		var watch = {
			lessDashboard: {
				files: grunt.const.folders.dev.dashboard.modules + '**/*.less',
				tasks: ['less:dashboard'],
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			},
			jsDashboard: {
				files: [grunt.const.folders.dev.dashboard.modules + '**/*.js',
				grunt.const.folders.dev.dashboard.modules + '**/*-template.html'],
				tasks: ['jshint:dashboard', 'browserify:dashboard'],
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			}
		};
		grunt.config.set('watch', watch);
		grunt.task.run('watch');
	});

	///---------------------------------------------------------------------------
	/// Watch app for all brands
	///---------------------------------------------------------------------------

	grunt.registerTask('watch:brands', "watch the styles for all brands", function () {
		// watch less for all brand separetly
		var watch = {
			brands: {
				files: grunt.const.folders.dev.app.modules + '**/*.less',
				options: {
					watch: true,
					livereload: grunt.const.server.livereload
				}
			}
		};

		var lessTasks = [];
		for (var i = 0; i < grunt.const.brands.length; i++) {
			lessTasks.push('less:' + grunt.const.brands[i]);
		}
		watch['brands'].tasks = lessTasks;

		grunt.config.set('watch', watch);
		grunt.task.run('watch');
	});

};
