///---------------------------------------------------------------------------
/// browserify App modules
///---------------------------------------------------------------------------

module.exports = function browserify(grunt) {
	var sources = [grunt.const.folders.dev.app.modules + grunt.const.appPrefix + '.app/index.js'];
	var dest = grunt.const.folders.dev.app.build + grunt.const.appPrefix + '.app.js';
	var destProd = grunt.const.folders.dist.app.build + grunt.const.appPrefix + '.app.js';

	var sourcesDashboard = [grunt.const.folders.dev.dashboard.modules + 'yoda.app/index.js'];
	var destDashboard = grunt.const.folders.dev.dashboard.build + 'yoda.app.js';
	var destDashboardProd = grunt.const.folders.dist.dashboard.build + 'yoda.app.js';

	var browserify = {
		app: {
			options: {
				transform: ['stringify', 'browserify-angular-injector', 'browserify-shim'],
				browserifyOptions: {
					watch: true,
					debug: true
				}
			},
			src: sources,
			dest: dest
		},
		appForProd: {
			options: {
				transform: ['stringify', 'browserify-angular-injector', 'browserify-shim'],
				browserifyOptions: {
					watch: true,
					debug: false
				}
			},
			src: sources,
			dest: destProd
		},
		dashboard: {
			options: {
				transform: ['stringify', 'browserify-angular-injector', 'browserify-shim'],
				browserifyOptions: {
					watch: true,
					debug: true
				}
			},
			src: sourcesDashboard,
			dest: destDashboard
		},
		dashboardForProd: {
			options: {
				transform: ['stringify', 'browserify-angular-injector', 'browserify-shim'],
				browserifyOptions: {
					watch: true,
					debug: true
				}
			},
			src: sourcesDashboard,
			dest: destDashboardProd
		}
	};

	grunt.config.set('browserify', browserify);
};
