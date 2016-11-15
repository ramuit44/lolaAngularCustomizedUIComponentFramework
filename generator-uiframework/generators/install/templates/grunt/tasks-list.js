///---------------------------------------------------------------------------
/// List of the main grunt tasks available
///---------------------------------------------------------------------------

module.exports = function tasks(grunt) {

    ///---------------------------------------------------------------------------
    /// Build the app with all brands and dashboard
    ///---------------------------------------------------------------------------
    grunt.registerTask('build:all',['build:allBrands', 'default-brand', 'copy:dashboardPages',
        'browserifyImports', 'scripts', 'styles', 'build:dashboard', 'karma:unit', 'connect', 'open', 'watch:app']); //'karma:unit',

    ///---------------------------------------------------------------------------
    /// Unit Test tasks
    ///---------------------------------------------------------------------------
    grunt.registerTask('build:test', ['karma:unit']);

    ///---------------------------------------------------------------------------
    /// Clean everything
    ///---------------------------------------------------------------------------
    grunt.registerTask('build:clean',['clean:dev', 'clean:dist','build:allBrands']);
    grunt.registerTask('build:dist',['build:test', 'browserifyImports', 'jshint:components', 'browserify:appForProd',
        'browserify:dashboardForProd', 'lessImportsModules','build:allBrands', 'copy:dashboardPagesProd',
        'copy:prodDashboardAssets','copy:prodAssets', 'copy:prodAppBuild', 'disableDebugInProd',
        'uglify:app','less:dashboard', 'cssmin:dashboard', 'cssmin:app', 'dashboardProd']);//, 'maven:package'
    //grunt.registerTask('build:deploy',['maven:deploy']);

    // Default task.
    grunt.registerTask('default', ['default-brand', 'browserifyImports', 'scripts', 'styles', 'connect', 'open', 'watch:app']); //'karma:unit',


    //OLD tasks
    grunt.registerTask('scripts', ['jshint:components', 'browserify:app', 'browserify:dashboard']);
    grunt.registerTask('styles', ['lessImportsModules', 'less:' + grunt.const.defaultBrand]);
    grunt.registerTask('default-brand', ['brandSwitch:' + grunt.const.defaultBrand, 'brandAssets:' + grunt.const.defaultBrand]);

    ///---------------------------------------------------------------------------
    /// Multibrand tasks
    ///---------------------------------------------------------------------------

    // create a build task for each brand
    var brand = "";
    var builds = [];
    for (var i = 0; i < grunt.const.brands.length; i++) {
        brand = grunt.const.brands[i];
        grunt.registerTask('build:' + brand, ['brandSwitch:' + brand, 'less:' + brand, 'brandAssets:' + brand]);
        builds.push('build:' + brand);
    }

    // build all brands
    grunt.registerTask('build:allBrands', builds);


    // build all and watch all + server
    grunt.registerTask('watch:all', ['build:allBrands', 'copy:dashboardPages', 'browserifyImports', 'scripts', 'dashboard', 'connect', 'open', 'karma:unit', 'watch:brands']);

    ///---------------------------------------------------------------------------
    /// Dashboard tasks
    ///---------------------------------------------------------------------------

    grunt.registerTask('build:dashboard', ['clean:dashboard', 'less:dashboard', 'browserify:dashboard', 'dashboard']);
    grunt.registerTask('watch:dashboard', ['build:dashboard', 'connect', 'open', 'watch:dashboard-app']);


};
