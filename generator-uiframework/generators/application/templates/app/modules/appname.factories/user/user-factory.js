/**
* User Model to fetch the user details.
*/
(function () {
	'use strict';

	angular.module('appname.factories.user', ['appname.factories.restangular']).factory('userFactory', User);
	User.$inject = ['$q', 'baseRestangularFactory', 'referenceDataFactory'];

	function User($q, baseRestangularFactory, referenceDataFactory) {

		User.current = {};
		User.accessBasedOnPermissions = referenceDataFactory.userFactory.accessBasedOnPermissions;

			User.brands = referenceDataFactory.global.brands;

			User.roles = referenceDataFactory.userFactory.roles;

			User.defaultBrand = referenceDataFactory.global.defaultBrand;

			User.currentUserDetails = {};
			User.loggedInUserDetails = {};
			User.delegatedAccessDetails = {};
			User.isError = {
					"genericError": false,
					"invalidBsb": false
			};
		User.getUser = function () {
          var deferred = $q.defer();
          var userRest = baseRestangularFactory.fetchAll('fetchUserData');
          var resp = userRest.customGET("");
          resp.then(function (response) {
              if (response.status.toLowerCase() === 'success') {
                  User.loggedInUserDetails = response.data;
                  User.currentUserDetails = response.data;
                  /*baseRestangularFactory.setDefaultHttpheaders(response.data);*/
                  deferred.resolve();
              } else {
                  User.isError.genericError = true;
                  deferred.resolve();
              }
          }, function (response) {
              User.isError.genericError = true;
              deferred.resolve();
          });
          return deferred.promise;
      };

			User.updateUserDetails = function (payload) {
            var deferred = $q.defer();
            var userRest = baseRestangularFactory.fetchAll('updateUserData');
            var resp = userRest.customPUT(angular.toJson(payload));
            resp.then(function (response) {
                if (response.status.toLowerCase() === 'success') {
                    User.currentUserDetails = response.data;
                    User.delegatedAccessDetails = response.data;
                    /*baseRestangularFactory.setDefaultHttpheaders(response.data);*/
                    deferred.resolve();
                } else {
                    User.isError.genericError = true;
		    User.isError.invalidBsb = false;
                    deferred.reject();
                }
            }, function (response) {
                if (response.data.errors && response.data.errors[0].code === referenceDataFactory.preferences.errorCodes.invalidBsb) {
                    User.isError.genericError = false;
                        User.isError.invalidBsb = true;
                } else {
		User.isError.invalidBsb = false;
                    User.isError.genericError = true;
                }
                deferred.reject();
            });
            return deferred.promise;
        };

        return User;

	/*	User.getUser = function () {
			var deferred = $q.defer();
			baseRestangularFactory.fetchAll('getUser').customGET('').then(function (response) {
				if (response.status.toLowerCase() === 'success') {
					User.current = response.data;
					deferred.resolve();
				} else {
					User.isError.genericError = true;
					deferred.resolve();
				}
			}, function (response) {
				User.isError.genericError = true;
				deferred.resolve();
			});
			return deferred.promise;
		};*/
	}
})();
