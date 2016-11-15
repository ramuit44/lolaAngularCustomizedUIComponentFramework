(function trapInit() {
    'use strict';

    //require('../../../../libs/jquery.trap.js');
    // declare the component angular module, you can inject dependencies here
    angular.module('appname.accessibility.trap', []);

    require('./trap-factory.js');
    // Require your components here
    require('./trap-directive.js');



}());
