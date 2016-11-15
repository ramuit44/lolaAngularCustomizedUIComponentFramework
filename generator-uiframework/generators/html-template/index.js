'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var camelCase = require('camel-case');
var capitalize = require('capitalize');
var walk = require('fs-walk').walk;
var fs = require('fs');
// var config = require('./yo.da.json');

var AngularDirectiveGenerator = yeoman.generators.Base.extend({
   initializing: function () {
      this.sourceRoot(path.join(__dirname, 'templates/'));
      this.options = {
         author: {
            name: this.user.git.name(),
            email: this.user.git.email()
         }
      };
   },

   // Ask the prefix of new directive
   askDirectivePrefix: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'prefix',
         message: 'Prefix ? (example in gui-popup, the prefix is gui)',
         default: 'wbc'
      }, function (result) {
         this.options.prefix = result.prefix;
         done();
      }.bind(this));
   },

   // Ask for the module name for the directive
   askModule: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'moduleName',
         message: 'Module ?',
         default: 'common'
      }, function (result){
         this.options.moduleName = result.moduleName;
         done();
      }.bind(this))
   },

   // Ask name of new directive
   askName: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'name',
         message: 'Component name?',
         default: 'my-directive'
      }, function (result) {
         var name = result.name.replace(/\ /g, '-');
         var prefix = this.options.prefix;
         this.options.name = {
            dashed: name,
            camel: camelCase(name),
            spaced: capitalize(name.replace(/\-/, '-')),
            prefixedDirective: camelCase(prefix + '-' + name)
         };

         done();
      }.bind(this));
   },

   getYodaOptions : function() {
      // get the config from yo.da.json
      var config = JSON.parse(fs.readFileSync('yo.da.json'), 'utf8');

      console.log(config.appFolder);
      console.log(config.componentsFolder);

      this.options.appFolder = config.appFolder;
      this.options.componentsFolder = config.componentsFolder;
      this.options.distFolder = config.distFolder;
   },

   writing: {
      dest: function () {
         var root = this.sourceRoot();
         this.destinationRoot(path.join(this.destinationRoot(), this.options.appFolder, this.options.componentsFolder, this.options.prefix + '.' + this.options.moduleName, this.options.name.dashed));
         var dest = this.destinationRoot();
         // var dest = path.join(this.options.moduleName, '/', this.destinationRoot());
         var that = this;

         walk(root, function (basedir, filename, stat, next) {
            var relativePath = basedir.replace(root, '');
            var filePath = path.join(basedir, filename);

            // Ignore this repo's README
            if (filename === 'README.md') {
               return next();
            };

            if (stat.isDirectory()) {
               // FIXME: if it's deep directory this won't work
               fs.mkdir(path.join(filename), next);
               return;s
            }

            fs.readFile(filePath, function (err, stream){
               if (err) {
                  return console.error(err);
               }

               var dashedNameWithPrefix = that.options.prefix + '-' + that.options.name.dashed;

               if (filename.indexOf('new-template') > -1) {
                  filename = filename.replace('new-template', that.options.name.dashed);
               }

               var fileString = stream.toString();
               var writeFilePath = path.join(dest, relativePath, filename);

               // app folder and components folder
               fileString = fileString.replace(/.\/appFolder/g, that.options.appFolder);
               fileString = fileString.replace(/\/componentsFolder\//g, that.options.componentsFolder);
               fileString = fileString.replace(/\/distFolder\//g, that.options.distFolder);

               // Templating
               fileString = fileString.replace(/prefix/g, that.options.prefix);
               fileString = fileString.replace(/fullname/g, that.options.name.prefixedDirective);

               fileString = fileString.replace(/moduleName/g, that.options.moduleName);

               // template
               fileString = fileString.replace(/new-template/g, that.options.name.dashed);
               fileString = fileString.replace(/newTemplate/g, that.options.name.camel);

               fs.writeFile(writeFilePath, fileString, next);
            });
         }, function(err) {
            console.error(err);
         });
      }
   },

   end: function () {
   }
});

module.exports = AngularDirectiveGenerator;
