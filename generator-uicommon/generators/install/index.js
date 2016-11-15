'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var fs = require('fs.extra');
var walk = require('fs-walk').walk;
var jsonfile = require('jsonfile');
var fse = require('fs-extra');


var gruntGenerator = yeoman.generators.Base.extend({
    prompting: function() {
        this.sourceRoot(path.join(__dirname, 'templates/'));
        this.file = 'yo.uicommon.json';
        // test if the yoda config file exist in the folder
        try {
            this.configs = jsonfile.readFileSync(this.file);
        } catch (e) {
            this.configs = {};
            fs.closeSync(fs.openSync(this.file, 'w'));
        }
    },

    writing: {
        dest: function() {

            ////////////////////////////////////////////////////////
            //           Create yo.da json file
            ////////////////////////////////////////////////////////

            this.file = 'yo.uicommon.json';
            this.configs.componentsFolder = '/modules/';


            jsonfile.writeFileSync(this.file, this.configs, { spaces: 2 });

            ////////////////////////////////////////////////////////
            //            Copy the required folders and files
            ////////////////////////////////////////////////////////


            var that = this;
            var root = that.sourceRoot();


            // copy the content of dev folder
            fs.copyRecursive(path.join(root, 'dev'), 'commonModules/dev', function() {
                console.log('done');
                var dest = "commonModules/dev/";
                getDirectories(dest);
            });

            //Next Steps

            // 1. goto components folder within commonModules/dev
            // 2. for each module within components object (within components.json) take the latest version of each components
            // 3. copy this latest folder into a new directory within the dev folder called appname.common
            // 4. a folder should be the name of the module and have all the files within it
            // 5. remove components folder


            function getDirectories(srcpath) {
                //var componentsJson = jsonfile.readFileSync(srcpath+'/components.json');
                var componentsJson = JSON.parse(fs.readFileSync(srcpath + 'components/components.json', 'utf8'));

                console.log("Component Json " + JSON.stringify(componentsJson));
                var modules = componentsJson.components;

                var appCommon = "appname.common";
                if (!fs.existsSync(srcpath + appCommon)) {
                    fs.mkdirSync(srcpath + appCommon);
                }

                var appCommonPath = srcpath + appCommon + "/";

                for (var i = 0; i < modules.length; i++) {
                    var dirName, version;
                    var module = modules[i];

                    dirName = module.name;
                    version = module.latest;

                    var trgComponentDir = appCommonPath + dirName;
                    if (!fs.existsSync(trgComponentDir)) {
                        fs.mkdirSync(trgComponentDir);
                    }

                    fse.copy(srcpath + '/components/' + dirName + "/" + version, trgComponentDir, function(err) {
                        if (err) return console.error(err)
                        console.log("copy success!")
                    });
                }
                fse.copy(srcpath + '/components/index.js', appCommonPath + '/index.js', function(err) {
                    if (err) return console.error(err)
                    console.log("index.js copied")
                });
                fse.copy(srcpath + '/components/index.less', appCommonPath + '/index.less', function(err) {
                    if (err) return console.error(err)
                    console.log("index.less copied")
                });
                fs.remove(srcpath + '/components', function(err) {
                    if (err) return console.error(err)
                    console.log('components deleted!')
                });

            }
        }
    },
    install: function() {
        this.installDependencies();
    }
});


module.exports = gruntGenerator;
