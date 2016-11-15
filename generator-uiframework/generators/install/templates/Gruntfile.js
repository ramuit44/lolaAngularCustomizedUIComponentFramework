module.exports = function(grunt) {
   require('time-grunt')(grunt);

   // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
   require('load-grunt-tasks')(grunt);

   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
   });

   grunt.loadTasks('grunt');
   grunt.loadTasks('grunt/tasks');
};
