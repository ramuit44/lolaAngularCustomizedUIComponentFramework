'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var camelCase = require('camel-case');
var capitalize = require('capitalize');
var walk = require('fs-walk').walk;
var fs = require('fs');
var stringHelper = require('../../helpers');

var AngularDirectiveGenerator = yeoman.generators.Base.extend({
   initializing: function () {
      this.sourceRoot(path.join(__dirname, 'templates/'));
      this.options = {
         author: {
            name: this.user.git.name(),
            email: this.user.git.email()
         }
      };

      console.log('------------------------------------------- BETA -------------------------------------------------');
      console.log('Warning: This function work only if the directive follow all the naming conventions.');
      console.log('Warning: Cloning a component with a name with one word to a two words name is not fully supported.');
      console.log('--------------------------------------------------------------------------------------------------');
   },

   ////////////////////////////////////////////////////////
   //          Get the config from yo.da.json
   ////////////////////////////////////////////////////////

   getYodaOptions : function() {
      var config = JSON.parse(fs.readFileSync('yo.da.json'), 'utf8');
      this.options.appFolder = config.appFolder;
      this.options.componentsFolder = config.componentsFolder;
      this.options.distFolder = config.distFolder;
   },

   ////////////////////////////////////////////////////////
   // Ask for the prefix and module name for the directive
   ////////////////////////////////////////////////////////

   askPrefixAndModule: function () {
      var done = this.async();

      var moduleFolder = this.destinationRoot() + '/' + this.options.appFolder + '/' + this.options.componentsFolder;

      var options = (function getDirectories(srcpath) {
         return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
         });
      })(moduleFolder);

      this.prompt({
         type: 'list',
         name: 'modulePrefixName',
         message: 'Module directory?',
         choices: options
      }, function (result){
         this.options.oldPrefixAndModuleName = result.modulePrefixName;
         this.options.oldPrefix = result.modulePrefixName.split('.')[0];
         this.options.oldModuleName = result.modulePrefixName.slice(result.modulePrefixName.split('.')[0].length + 1, result.modulePrefixName.length);
         done();
      }.bind(this))
   },

   ////////////////////////////////////////////////////////
   //           Find the component to clone
   ////////////////////////////////////////////////////////
   askComponent: function () {
      var done = this.async();

      var moduleFolder = this.destinationRoot() + '/' + this.options.appFolder + '/' + this.options.componentsFolder + '/' + this.options.oldPrefixAndModuleName;

      var options = (function getDirectories(srcpath) {
         return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
         });
      })(moduleFolder);

      this.prompt({
         type: 'list',
         name: 'oldName',
         message: 'Component name',
         choices: options
      }, function (result) {
         var oldName = result.oldName.replace(/\ /g, '-');
         var prefix = this.options.prefix;
         this.options.oldName = {
            dashed: oldName,
            camel: camelCase(oldName),
            spaced: capitalize(oldName.replace(/\-/, '-')),
            prefixedDirective: camelCase(prefix + '-' + oldName),
            prefixedDirectiveDashed: camelCase(prefix + '-' + oldName)
         };
         done();
      }.bind(this));
   },

   ////////////////////////////////////////////////////////
   //        Ask the new Prefix of the directive
   ////////////////////////////////////////////////////////

   askNewPrefix: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'prefix',
         message: 'New Prefix? (example in gui-popup, the prefix is gui)',
         default: 'wbc'
      }, function (result) {
         this.options.prefix = result.prefix;
         done();
      }.bind(this));
   },

   ////////////////////////////////////////////////////////
   //                 Ask new Module name
   ////////////////////////////////////////////////////////

   askNewModuleName: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'moduleName',
         message: 'New Module name? (ex: new.module.components)',
         default: 'new.module.components'
      }, function (result) {
         this.options.moduleName = result.moduleName;
         done();
      }.bind(this));
   },

   ////////////////////////////////////////////////////////
   //             Ask name of new directive
   ////////////////////////////////////////////////////////

   askName: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'name',
         message: 'Directive name',
         default: 'example'
      }, function (result) {
         var name = result.name.replace(/\ /g, '-');
         var prefix = this.options.prefix;
         this.options.name = {
            dashed: name,
            camel: camelCase(name),
            spaced: capitalize(name.replace(/\-/, '-')),
            prefixedDirective: camelCase(prefix + '-' + name),
            prefixedDirectiveDashed: camelCase(prefix + '-' + name)
         };
         done();
      }.bind(this));
   },

   ////////////////////////////////////////////////////////
   //                     Templating
   ////////////////////////////////////////////////////////

   writing: {
      dest: function () {
         this.sourceRoot(path.join(this.destinationRoot(), this.options.appFolder, this.options.componentsFolder, this.options.oldPrefixAndModuleName, this.options.oldName.dashed));

         this.destinationRoot(path.join(this.destinationRoot(), this.options.appFolder, this.options.componentsFolder, this.options.prefix + '.' + this.options.moduleName, this.options.name.dashed));

         var root = this.sourceRoot();
         var dest = this.destinationRoot();
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
               else if (filename.indexOf(that.options.oldName.dashed) > -1) {
                  filename = filename.replace(that.options.oldName.dashed, that.options.name.dashed);
               }

               var fileString = stream.toString();
               var writeFilePath = path.join(dest, relativePath, filename);

               ////////////////////////////////////////////////////////
               //                     Module rename
               ////////////////////////////////////////////////////////

               var oldModule = that.options.oldPrefixAndModuleName;
               var newModule = that.options.prefix + '.' + that.options.moduleName;
               fileString = stringHelper.replaceAll(fileString, oldModule, newModule);

               ////////////////////////////////////////////////////////
               //                     files rename
               ////////////////////////////////////////////////////////

               fileString = stringHelper.replaceAll(fileString, that.options.oldName.dashed + '-', that.options.name.dashed + '-');
               fileString = stringHelper.replaceAll(fileString, that.options.oldName.dashed + '.', that.options.name.dashed + '.');

               ////////////////////////////////////////////////////////
               //                  Full name with prefix
               ////////////////////////////////////////////////////////

               var oldDirectiveNameCamel = camelCase(that.options.oldPrefix + '-' + that.options.oldName.camel);
               var newDirectiveNameCamel = camelCase(that.options.prefix + '-' + that.options.name.camel);
               fileString = stringHelper.replaceAll(fileString, oldDirectiveNameCamel, newDirectiveNameCamel);

               fileString = stringHelper.replaceAll(fileString, that.options.oldName.prefixedDirective, that.options.name.prefixedDirective);
               fileString = stringHelper.replaceAll(fileString, that.options.oldName.prefixedDirectiveDashed, that.options.name.prefixedDirectiveDashed);

               ////////////////////////////////////////////////////////
               //             prefix, name.camel, moduleName
               ////////////////////////////////////////////////////////

               fileString = stringHelper.replaceAll(fileString, that.options.oldPrefix, that.options.prefix);
               fileString = stringHelper.replaceAll(fileString, that.options.oldName.camel, that.options.name.camel);
               fileString = stringHelper.replaceAll(fileString, that.options.oldName.dashed, that.options.name.dashed);
               fileString = stringHelper.replaceAll(fileString, that.options.oldModuleName, that.options.moduleName);

               // name separated with space is use in the test page
               fileString = stringHelper.replaceAll(fileString, that.options.oldName.spaced, that.options.name.spaced);

               fs.writeFile(writeFilePath, fileString, next);
            });
         }, function(err) {
            console.error(err);
         });
      }
   },

   end: function () {
      // this.installDependencies();
   }
});

module.exports = AngularDirectiveGenerator;
