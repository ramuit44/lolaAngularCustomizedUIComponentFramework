// Karma configuration
var browserify = require('browserify');

module.exports = function(config) {

   config.set({
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath : './',

      plugins: [
         'karma-browserify',
         'karma-jasmine',
         'karma-coverage',
         'karma-phantomjs-launcher',
         'PhantomJS'
      ],

      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],

      // list of files / patterns to load in the browser
      files: [
         'node_modules/jquery/dist/jquery.js',
         'node_modules/angular/angular.js',
         'node_modules/angular-mocks/angular-mocks.js',
         'dev/app/build/*.js',
         'dev/app/modules/**/*.specs.js'
      ],

      // list of files to exclude
      exclude: [
         //'app/**/yoda.*.js'
      ],

      browserify: {
         debug: true,
         transform: ['stringify', 'browserify-angular-injector', 'browserify-shim', 'browserify-istanbu']
      },

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
         // 'app/dist/*.js': ['coverage']
      },

      // test results reporter to use9
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'dots'], //, 'coverage'

      // coverageReporter: {
      //    dir: 'coverage/',
      //    reporters: [
      //       { type: 'text-summary' },
      //       { type: 'lcov', subdir: './' }
      //    ]
      // },

      // web server port
      port: 9876,

      // enable / disable colors in the output (reporters and logs)
      colors: true,

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_ERROR,

      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: false,

      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'], //'Chrome', 'PhantomJS'

      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false
   })
}
