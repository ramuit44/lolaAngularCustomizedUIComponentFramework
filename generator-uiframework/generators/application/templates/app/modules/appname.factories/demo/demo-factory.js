(function () {
    'use strict';

    angular
        .module('appname.factories.demo', ['appname.factories.restangular'])
        .factory('demoFactory', Demo);

    Demo.$inject = ['baseRestangularFactory', '$q'];

    /**
     * Demo Model that provides core
     * @returns {{}}
     * @constructor
     */
    function Demo(baseRestangularFactory, $q) {
        Demo.demoList = [];
        Demo.demoBusClassList = [];


        Demo.fetchDemoList = function (payload) {
            var deferred = $q.defer();
            Demo.demoList = [];
            Demo.demoBusClassList = [];
            Demo.states = [];
            Demo.countryList = [];
            var demoRest = baseRestangularFactory.fetchAll('demoData');
            var resp = demoRest.post(angular.toJson(payload));
            Demo.demoList = [];
            resp.then(function (response) {
                if (response.status.toLowerCase() === 'success') {
                    if (response.data) {
                        Demo.demoList  = response.data;
                        Demo.demoBusClassList = response.data.businessClassifications;
                        Demo.states = response.data.states;
                        Demo.countryList = response.data.countries;
                    }
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }, function (response) {
                deferred.reject();
            });
            return deferred.promise;
        };


        return Demo;

    }
})();
