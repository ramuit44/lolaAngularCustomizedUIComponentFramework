(function () {
    'use strict';

    angular.module('appname.factories.restangular', ['restangular', 'appname.factories.core'])
        .factory('baseRestangularFactory', BaseRestangular);

    BaseRestangular.$inject = ['Restangular', 'coreGenericFactory'];

    function BaseRestangular(restangularFactory, coreGenericFactory) {
        var isLocal = coreGenericFactory.isLocal();
        var baseURL = isLocal ? 'app/modules/appname.mocks/' : 'http://SERVER_IP:PORT_NUMBER/api/';
        var restAng = getConfigurator(baseURL);

        var restMap = {
            'configurator': restAng,
            'getUser': isLocal ? 'user/1.json' : 'users/details',
            'fetchUserData': isLocal ? 'user/users.json' : 'users/details',
            'updateUserData': isLocal ? 'user/delegatedUser.json' : 'users/details',
            'demoData': isLocal ? 'demo/demo.json' : 'demo/demo'
        };

        function getConfigurator(configurl) {
            var configurator = restangularFactory.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl(configurl);
                RestangularConfigurer.setDefaultHttpFields({
                    cache: false,
                    timeout: 55000
                });
                RestangularConfigurer.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                    var headerDetails = {};
                    return {
                        element: element,
                        params: _.extend(params, {
                            nocache: new Date().getTime(),
                            single: true
                        }),
                        headers: _.extend(headers, headerDetails),
                        httpConfig: httpConfig
                    };
                });
            });
            return configurator;
        }

        // Get the configuration based on URL
        function getUrlConfiguration(urlVal) {
            if (restMap[urlVal]) {
                return {
                    url: restMap[urlVal],
                    configurator: restMap.configurator
                };
            }
        }


        /****************** Final Method ************************************/
        var baseConfig = {
            fetchAll: function (url) {
                var finalUrlConfig = getUrlConfiguration(url);
                return finalUrlConfig.configurator.all(finalUrlConfig.url);
            }
        };
        return baseConfig;
    }
})();
