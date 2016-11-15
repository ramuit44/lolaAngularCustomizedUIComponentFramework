(function () {
    'use strict';

    angular.module('appname.factories.contentmgnt', []).factory('contentManagementFactory', ContentManagement);
    ContentManagement.$inject = [];

    function ContentManagement() {
        ContentManagement.global = {
          "errorMsg": {
            "unAuthorized": "Not Authorized",
            "genericError": "An unexpected error has occurred with Rate Finder service, please try again."
          },
          "noData": '---',
          "lockedFieldMsg": 'This field is locked and cannot be edited.'
        };
        ContentManagement.header = {
          "userName": "User",
          "userBsb": "BSB",
          "branchSuffix": "Branch"
        };
        ContentManagement.footer = {
            "copyrightLine1": "Our site and your online application are secure. Read more about online security",
            "copyrightLine2": "&nbsp;a division of Westpac banking Corporation ABN 33 007 457 141&#44; AFSL and Australian credit licence 233714&#46;",
            "brandName": {
                "wbc": "Westpac",
                "stg": "St&#46; George",
                "bom": "Bank of Melbourne",
                "bsa": "Bank South Australia"
            }
        };

        ContentManagement.preferences = {
            "header": {
                "title": "User Preferences",
                "errorMsg": {
                    "genericError": ContentManagement.global.errorMsg.genericError,
                    "invalidBsb": "The BSB you entered was invalid, please re-enter your BSB"
                }
            },
            "footer": {
                "actions": {
                    "cancel": "Cancel",
                    "submit": "Update"
                }
            },
            "body": {
                "role": "Role",
                "brand": "Brand",
                "bsb": "BSB",
                "branch": "Branch",
                "contactNum": "Contact Number",
                "validation": {
                    "contactNumber": "Please enter digits only",
                    "bsb": "Please enter valid bsb"
                },
                "placeholder": {
                    "bsb": "BSB number",
                    "contactNumber": "Contact number"
                }
            }
          };

        return ContentManagement;
    }

})();
