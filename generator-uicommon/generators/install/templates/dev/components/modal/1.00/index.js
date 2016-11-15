(function modalInit() {
    'use strict';

    //require('../../../../libs/jquery.trap.js');
    // declare the component angular module, you can inject dependencies here
    angular.module('appname.common.modal', []);

    require('./modal-factory.js');

    // Require your components here
    require('./modal-directive.js');

}());
