'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var camelCase = require('camel-case');
var capitalize = require('capitalize');
var walk = require('fs-walk').walk;
var fs = require('fs');
var fs = require('fs-extra');

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

   ////////////////////////////////////////////////////////
   //           Ask the prefix of new directive
   ////////////////////////////////////////////////////////

   askDirectivePrefix: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'prefix',
         message: 'Prefix (example in gui-popup, the prefix is gui)',
         default: 'wbc'
      }, function (result) {
         this.options.prefix = result.prefix;
         done();
      }.bind(this));
   },

   ////////////////////////////////////////////////////////
   //     Ask for the module name for the directive
   ////////////////////////////////////////////////////////

   askModule: function () {
      var done = this.async();

      this.prompt({
         type: 'input',
         name: 'moduleName',
         message: 'Module name',
         default: 'common'
      }, function (result){
         this.options.moduleName = result.moduleName;
         done();
      }.bind(this))
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

   ////////////////////////////////////////////////////////
   //             Get the config from yo.da.json
   ////////////////////////////////////////////////////////

   getYodaOptions : function() {
      var config = JSON.parse(fs.readFileSync('yo.da.json'), 'utf8');

      console.log(config.appFolder);
      console.log(config.componentsFolder);

      this.options.appFolder = config.appFolder;
      this.options.componentsFolder = config.componentsFolder;
      this.options.distFolder = config.distFolder;
   },

   ////////////////////////////////////////////////////////
   //                     Templating
   ////////////////////////////////////////////////////////

   writing: {
      dest: function () {
         var root = this.sourceRoot();
         this.destinationRoot(path.join(this.destinationRoot(), 'dev', this.options.appFolder, this.options.componentsFolder, this.options.prefix + '.' + this.options.moduleName, this.options.name.dashed));
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
               return;
            }

            fs.readFile(filePath, function (err, stream){
               if (err) {
                  return console.error(err);
               }

               // Replace directive.md with README.md
               if (filename === 'newDirective.md') {
                  filename = 'README.md';
               }
               // Replace src
               else if (filename.indexOf('new-directive') > -1) {
                  filename = filename.replace('new-directive', that.options.name.dashed);
               }

               var fileString = stream.toString();
               var writeFilePath = path.join(dest, relativePath, filename);

               // app folder and components folder
               fileString = fileString.replace(/.\/appFolder/g, that.options.appFolder);
               fileString = fileString.replace(/\/componentsFolder\//g, that.options.componentsFolder);
               fileString = fileString.replace(/\/distFolder\//g, that.options.distFolder);

               // Templating
               fileString = fileString.replace(/new-directive/g, that.options.name.dashed);
               fileString = fileString.replace(/newDirective/g, that.options.name.camel);
               fileString = fileString.replace(/prefix/g, that.options.prefix);
               fileString = fileString.replace(/fullname/g, that.options.name.prefixedDirective);

               fileString = fileString.replace(/moduleName/g, that.options.moduleName);

               fileString = fileString.replace(/angular-directive-template/g, that.options.name.dashed);
               fileString = fileString.replace(/directive.js/g, that.options.name.dashed + '-directive.js');
               fileString = fileString.replace(/directive.css/g, that.options.name.dashed + '-style.css');
               fileString = fileString.replace(/directive.less/g, that.options.name.dashed + '-style.less');
               fileString = fileString.replace(/directive.html/g, that.options.name.dashed + '-template.html');
               fileString = fileString.replace(/[t|T]he [d|D]irective/g, that.options.name.spaced);

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
