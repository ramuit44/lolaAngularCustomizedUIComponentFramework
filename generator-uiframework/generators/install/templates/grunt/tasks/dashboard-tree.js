///---------------------------------------------------------------------------
/// Create the json tree for the dashboard by checking all modules and compoents
///---------------------------------------------------------------------------

module.exports = function yodaCatwalk(grunt) {
	grunt.registerTask("dashboard", "Create the components and module tree for the demo site", function() {
		var tree = {};

		tree.dashboardOptions = {
			appPrefix: grunt.const.appPrefix,
			lazyload: grunt.const.lazyload,
			brands: grunt.const.brands
		};

		function getDirName(href) {
			return href.substr(href.lastIndexOf('/') + 1);
		}

		// loop on all Modules folders
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {
			if (grunt.file.isDir(dir)) {
				tree[getDirName(dir)] = {
					name: getDirName(dir),
					components: {},
					href: dir,
				};

				// loop on all Components folder
				grunt.file.expand(dir + "/*").forEach(function (subDir) {
					if(grunt.file.exists(subDir + '/' + getDirName(subDir) + '-page.html') && grunt.file.isDir(subDir)) {
						tree[getDirName(dir)].components[getDirName(subDir)] = {
							name: getDirName(subDir),
							href: subDir
						};
					}
				});
			}
		});

		// Save into the json file inside the demo folder here
		var demoSettingsFile = grunt.const.folders.dev.dashboard.root + '/data.json';
		// 1 test if the file exist
		if (grunt.file.exists(demoSettingsFile)) {
			// 2 if the file exist then delete it
			grunt.file.delete(demoSettingsFile);
		}

		// 3 create the file
		grunt.file.write(demoSettingsFile, JSON.stringify(tree));


	});
	grunt.registerTask("dashboardProd", "Create the components and module tree for the demo site", function() {
		var tree = {};

		tree.dashboardOptions = {
			appPrefix: grunt.const.appPrefix,
			lazyload: grunt.const.lazyload,
			brands: grunt.const.brands
		};

		function getDirName(href) {
			return href.substr(href.lastIndexOf('/') + 1);
		}

		// loop on all Modules folders
		grunt.file.expand(grunt.const.folders.dev.app.modules + "*").forEach(function (dir) {
			if (grunt.file.isDir(dir)) {
				tree[getDirName(dir)] = {
					name: getDirName(dir),
					components: {},
					href: dir,
				};

				// loop on all Components folder
				grunt.file.expand(dir + "/*").forEach(function (subDir) {
					if(grunt.file.exists(subDir + '/' + getDirName(subDir) + '-page.html') && grunt.file.isDir(subDir)) {
						tree[getDirName(dir)].components[getDirName(subDir)] = {
							name: getDirName(subDir),
							href: subDir
						};
					}
				});
			}
		});

		// Save into the json file inside the demo folder here
		var demoSettingsFile = grunt.const.folders.dist.dashboard.root + '/data.json';
		// 1 test if the file exist
		if (grunt.file.exists(demoSettingsFile)) {
			// 2 if the file exist then delete it
			grunt.file.delete(demoSettingsFile);
		}

		// 3 create the file
		grunt.file.write(demoSettingsFile, JSON.stringify(tree));


	});

};
