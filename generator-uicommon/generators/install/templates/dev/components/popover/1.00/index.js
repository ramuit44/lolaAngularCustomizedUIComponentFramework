(function popoverInit() {
    'use strict';

    // declare the component angular module, you can inject dependencies here
    angular.module('appname.common.popover', []);

    // Require your components here
    require('./popover-directive.js');
    require('./popover-factory.js');

}());
