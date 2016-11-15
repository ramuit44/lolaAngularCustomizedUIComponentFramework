///---------------------------------------------------------------------------
/// disableDebugInProd
///---------------------------------------------------------------------------

module.exports = function disableDebugInProd(grunt) {

    grunt.registerTask("disableDebugInProd", "Disable debug in prod", function () {
        var appFilePath = grunt.const.folders.dist.app.build + grunt.const.appPrefix + '.app.js';
        if (grunt.file.exists(appFilePath)) {
            // get the app-route.js file content
            var appRouteFileContent = grunt.file.read(appFilePath, {
                encoding: 'utf8'
            });
            var disableDebugProdFileContent = grunt.file.read('grunt/tasks/templates/disable-debug-prod.js', {
                encoding: 'utf8'
            });
            fileContent = appRouteFileContent.replace(/\/\/\sThis will be replaced with disable debug config when prod version of grunt task is run/g, disableDebugProdFileContent);
            // Edit the app-route.js file
            grunt.file.write(appFilePath, fileContent);
        }

    });
};
