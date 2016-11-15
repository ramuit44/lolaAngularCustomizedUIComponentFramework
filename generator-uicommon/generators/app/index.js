'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
   prompting: function () {
      var done = this.async();

      this.log("                       .-::::::--`                          ");
      this.log("                     .++/////////+/`                        ");
      this.log("                   ./++/++++/+/++++o-                       ");
      this.log("                  .o//++++++/++++++/+:                      ");
      this.log("   -:::--------.. ///++++//+/+//++++/o`..--------:::-       ");
      this.log("   //+oo++++/////+o//+++++/////++///+++//+++++o++++/+       ");
      this.log("    ``-/o++++o+//////+osoo/////ooo++//+//+++++++/+/-.       ");
      this.log("        .+++o//++///+-yNN:o++++/NN//////++++o+++/.          ");
      this.log("         `:++///++//++oss+o+++o+yy++//++////+/-`            ");
      this.log("           `.://++++////++/+/++o/////////++/-               ");
      this.log("               ````/o///++++/+++///o:::::-`                 ");
      this.log("                 `-:/://+++++++++//-:.                      ");
      this.log("                -:..:..-/o++++++-.:..-:    Do.              ");
      this.log("               --...:...-soooos:..:...-:   Or do not.       ");
      this.log("               /....--..-sooooo-..:..../`  There is no try. ");
      this.log("               /..---:--/o+ooys/-:----..:                   ");
      this.log("              --..-.....//+ooyh/....--../                   ");
      this.log("              :........./yyyyyh+......../                   ");
      this.log("              /........./yyhodhs........:.                  ");
      this.log("              /.........:syhoo//........-:                  ");
      this.log("              :.........:/hhs:.:........--                  ");
      this.log("              .:......--:.yhh-.:---...../`                  ");
      this.log("               +------....syd.....----:-.                   ");
      this.log("               /..........shh........./`                    ");
      this.log("               /..........hho........./`                    ");
      this.log("               /..---::--+hh+---:/:--./`                    ");
      this.log("               /..+oosssshyh+ososssss//`                    ");
      this.log("                ../o:/+:+hhh-/+-/+-+/-.                     ");
      this.log("                                                            ");
      this.log(" ----------------------Yo:uiframework v3------------------- ");

      this.log(" Available commands: ");
      this.log(" yo uiframework:install ");
      this.log(" yo uicommon:install ");
		this.log(" yo uiframework:application ");
      this.log(" yo uiframework:component ");

      // this.log("---- BETA ----");
      // this.log(" yo da:clone-component ");

		this.log("-----------------");
      this.log("Brainchild of @BastienZag - Global Components @whitmarshdaniel");
   },
   install: function () {
      //this.installDependencies();
   }
});
