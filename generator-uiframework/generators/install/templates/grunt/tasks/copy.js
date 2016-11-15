///---------------------------------------------------------------------------
///
/// Copy tasks
///
/// dashboardPages : copy the demo page for the dashboard
/// templates : copy external template to build folder
/// prodAssets : copy folder libs, img and html page to prod folder
/// prodAppBuild : copy the app build folder to the prod folder
///
///---------------------------------------------------------------------------

module.exports = function copy(grunt) {

    // var copy = grunt.config.get('copy') || {};

    var copy = {
        dashboardPages: {
            files: [
				// flattens results to a single level
                {
                    expand: true,
                    src: [grunt.const.folders.dev.app.modules + '**/*-page.html', grunt.const.folders.dev.app.modules + '**/*-mock.js'],
                    dest: grunt.const.folders.dev.dashboard.root + '/pages',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var prefix = folder.substring(folder.lastIndexOf('/'), folder.length).replace('/', '');

                        var pathArray = folder.split('/');
                        var prefix = pathArray[pathArray.length - 2].replace('.', '-');

                        var filename = src.substring(src.lastIndexOf('/'), src.length).replace('/', '');

                        console.log(dest + '/' + prefix + '-' + filename);
                        return dest + '/' + prefix + '-' + filename;
                    }
				}
			]
        },
        dashboardPagesProd: {
            files: [
                // flattens results to a single level
                {
                    expand: true,
                    src: [grunt.const.folders.dev.app.modules + '**/*-page.html', grunt.const.folders.dev.app.modules + '**/*-mock.js'],
                    dest: grunt.const.folders.dist.dashboard.root + '/pages',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var prefix = folder.substring(folder.lastIndexOf('/'), folder.length).replace('/', '');

                        var pathArray = folder.split('/');
                        var prefix = pathArray[pathArray.length - 2].replace('.', '-');

                        var filename = src.substring(src.lastIndexOf('/'), src.length).replace('/', '');

                        console.log(dest + '/' + prefix + '-' + filename);
                        return dest + '/' + prefix + '-' + filename;
                    }
                }
            ]
        },
        templates: {
            files: [
				// flattens results to a single level
                {
                    expand: true,
                    flatten: true,
                    src: [grunt.const.folders.dev.app.modules + '**/*-ext-template.html'],
                    dest: grunt.const.folders.dev.app.build + 'templates',
                    filter: 'isFile'
				}
			]
        },
        prodDashboardAssets: {
            files: [
                // copy html file from the root of the dev folder
                // copy img and libs folder from the root of the dev folder
                // to the root of the prod folder
                {
                    expand: true,
                    cwd: grunt.const.folders.dev.root,
                    src: ['dashboard.html', 'libs/**', 'img/**'],
                    // src: [grunt.const.folders.dev.root + '/*.html', grunt.const.folders.dev.root + '/libs', grunt.const.folders.dev.root + '/img'],
                    dest: grunt.const.folders.dist.root
                }
            ]
        },
        prodAssets: {
            files: [
				// copy html file from the root of the dev folder
				// copy img and libs folder from the root of the dev folder
				// to the root of the prod folder
                {
                    expand: true,
                    cwd: grunt.const.folders.dev.root,
                    src: ['index.html', 'libs/**', 'img/**'],
                    // src: [grunt.const.folders.dev.root + '/*.html', grunt.const.folders.dev.root + '/libs', grunt.const.folders.dev.root + '/img'],
                    dest: grunt.const.folders.dist.root
				}
			]
        },
        prodAppBuild: {
            files: [
				// copy the app build folder to the prod folder (before uglify)
				// don't take .js (move to prod by uglify task)
				// don't take .css (move to prod by cssmin task)
                {
                    expand: true,
                    cwd: grunt.const.folders.dev.app.build,
                    src: ['**', '!**.js', '!**/*.css', '!**/*.css.map'],
                    dest: grunt.const.folders.dist.app.build,
				}
			]
        }
    };

    grunt.config.set('copy', copy);
};
