(function appnamePredictiveAddressSearchDirective() {
    'use strict';
    angular.module('appname.common.predictiveAddressSearch').directive('appnamePredictiveAddressSearch', PredictiveAddressSearch);

    PredictiveAddressSearch.$inject = ['$compile','$parse'];

    function PredictiveAddressSearch($compile,$parse) {
        var directive = {
            restrict: 'EA',
            template: require('./predictive-address-search-template.html'),
            scope: {
                "addressObj": '=',
                'labelName': '@',
                'valueName': '@',
                'groupTitle': '@',
                'name': '@',
                'onChange': '&',
                'isDisabled': '=',
                'isRequired': '=',
                'isInvalid': '=',
                'errorMsg': '@',
                'tooltipPosition': '@',
                'getMatchingAddressList': '&',
                'getFormattedAddress': '&',
                'matchingAddressList': '=',
                'formattedAddress': '=',
                'stateList': '='
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var element = el.find('.qas');
            var Address = {};
            scope.$watch('vm.stateList',function(newValue) {
                if (newValue) {
                    scope.stateList = newValue;
                }
            });

            // Environment.fetchEnvironmentDetails();
            Address.qasFlag = true;//Environment.hasQasEnabled;
            Address.qasUrl = "";//Environment.qasUrl;

            /**
             * This method should be called from every controller from which qas needs to be implemented.
             * @param address1
             * @param matchList
             * @param addresses
             * @param primaryAddress
             * @param refdata
             * @param callback
             */
            var addressUpdated = "";

            Address.updateAddress = function updateAddress(address) {
                addressUpdated = address;
            };

            /**
             * This method calls the getmatchingAddress method of service.
             * @param addressValue
             * @returns {*}
             */
            Address.getMatchingAddress = function (addressValue, callback, failCallback) {
                scope.vm.getMatchingAddressList( {addressValue : addressValue}, scope, { $event: event });
                /*Address.getMatchingAddressList(addressValue);*/
                scope.$watch('vm.matchingAddressList',function(response){
                    if(response){
                        callback(response);
                    }else{
                        failCallback(response);
                    }
                });
            };

            Address.isQASSuccess = function (matchList, primaryAddress, callback) {
                //added the following for QAS implementation
                var addresses = [];
                var matchingAddressData = [];
                $('.address').typeahead({
                    minLength: 5,
                    source: function (query, process) {
                        //Start:typeahead implementation
                        matchList = [];

                        var qasError = true;
                        query = query.trim();
                        if (query.length > 4) {
                            var response1 = Address.getMatchingAddress(query, function (data) {
                                qasError = false;
                                matchList = [];
                                if (data !== null) {
                                    addresses = [];
                                    for (var i = 0; i < data.length; i++) {
                                        var displayAddress = data[i].DisplayText;
                                        var addressId = data[i].AddressIdentifier;
                                        if (query == $('.address').val() &&
                                            displayAddress.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                                            matchList.push(displayAddress);
                                            addresses.push(data[i]);
                                        }
                                    }
                                }

                                if (matchList.length === 0 || !process(matchList)) {
                                    primaryAddress = Address.clearValues(primaryAddress);
                                    callback(false);
                                }
                                else if (process(matchList)) {
                                    callback(true);
                                }

                            }, function (data) {

                                console.log("inside error in connection  " + data);

                                callback(false);
                                // isQASSuccessFlag = false;
                            });
                        }
                    },
                    select: function () {
                        //overriding default select functionality of typeahead
                        var val = this.$menu.find('.active').data('value');
                        var id = Address.getId(val, addresses);
                        if (!angular.isUndefined(id)) {
                            scope.$apply(function () {
                                scope.vm.getFormattedAddress( {idValue : id}, scope, { $event: event });
                            });
                            scope.$watch('vm.formattedAddress',function(data){
                                if(data){
                                    primaryAddress = Address.setFormatAddress(data, primaryAddress);
                                    callback(true);
                                }else{
                                    primaryAddress = Address.clearValues(primaryAddress);
                                    callback(false);
                                    console.log("inside error in format response" + status);
                                }
                            });
                        }
                        if (this.autoSelect || val) {
                            this.$element
                                .val(this.updater(val))
                                .change();
                        }
                        $('#address').blur();
                        return this.hide();

                    }, updater: function (item) {
                        return item;
                    }, matcher: function (item) {
                        return true;
                    }
                });
            };

            /**
             * This method fetches the AddressIdentifier of the address selected.
             * @param idValue
             * @param addresses
             * @returns {string}
             */
            Address.getId = function (idValue, addresses) {
                var response = '';
                for (var i = 0; i < addresses.length; i++) {
                    var displayAddress = addresses[i].DisplayText;
                    if (displayAddress === idValue) {
                        response = addresses[i].AddressIdentifier;
                    }
                }
                console.log("id matched is " + response);
                return response;

            };

            /**
             * This method sets the formatted response into model values.
             * @param dataValues
             * @param primaryAddress
             * @param Wrapper
             * @param refdata
             * @returns {*}
             */
            Address.setFormatAddress = function (dataValues, primaryAddress) {
                console.log(dataValues.preceedingText);
                // addressField = dataValues;
                var formatAddress = primaryAddress;
                formatAddress.state = {};
                formatAddress.mailingName1 = "";
                formatAddress.mailingName2 = "";
                formatAddress.mailingName3 = "";
                formatAddress.addressLine1 = "";
                formatAddress.addressLine2 = "";
                formatAddress.addressLine3 = "";
                formatAddress.address = "";
                formatAddress.address2 = "";
                formatAddress.addr2 = "";
                formatAddress.addr1 = "";
                formatAddress.postCode = "";
                if (dataValues.preceedingText) {
                    formatAddress.mailingName1 = dataValues.preceedingText.trim() + ' ';
                }
                if (dataValues.PropertyName) {
                    formatAddress.mailingName1 += dataValues.PropertyName.trim() + ' ';
                }
                if (dataValues.UnitNumber) {
                    formatAddress.mailingName1 += dataValues.UnitNumber.trim() + ' ';
                }
                if (dataValues.FloorAddress) {
                    formatAddress.mailingName1 += dataValues.FloorAddress.trim();
                }
                if (dataValues.StreetNumber) {
                    formatAddress.mailingName2 = dataValues.StreetNumber.trim() + ' ';
                }
                if (dataValues.StreetName) {
                    formatAddress.mailingName2 += dataValues.StreetName.trim() + ' ';
                }
                if (dataValues.StreetSUffixType) {
                    formatAddress.mailingName2 += dataValues.StreetSUffixType.trim();
                }
                if (dataValues.stateCode) {
                    formatAddress.state.code = dataValues.stateCode.trim();
                    for(var stateIndex in scope.stateList){
                        if(scope.stateList[stateIndex].code == formatAddress.state.code) {
                            formatAddress.state.value = scope.stateList[stateIndex].value;
                            break;
                        }
                    }
                }
                formatAddress.city = dataValues.Suburb;
                formatAddress.suburb = dataValues.Suburb;
                formatAddress.addcity = dataValues.Suburb;
                formatAddress.pocode = dataValues.PostCode;
                formatAddress.postCode = dataValues.PostCode;
                formatAddress.addpostcode = dataValues.PostCode;
                formatAddress.postcode = dataValues.PostCode;

                if (!formatAddress.mailingName1) {
                    if (formatAddress.mailingName2) {
                        formatAddress.mailingName1 = formatAddress.mailingName2;
                        if (formatAddress.mailingName3) {
                            formatAddress.mailingName2 = formatAddress.mailingName3;
                            formatAddress.mailingName3 = "";
                        } else {
                            formatAddress.mailingName2 = "";
                        }
                    }
                    else if (formatAddress.mailingName3) {
                        formatAddress.mailingName1 = formatAddress.mailingName3;
                        formatAddress.mailingName3 = "";
                    }

                } else {
                    if (!formatAddress.mailingName2) {
                        if (formatAddress.mailingName3) {
                            formatAddress.mailingName2 = formatAddress.mailingName3;
                            formatAddress.mailingName3 = "";
                        }
                    }
                }

                if (formatAddress.mailingName1) {
                    formatAddress.mailingName1 = formatAddress.mailingName1.trim();
                    formatAddress.addressLine1 = formatAddress.mailingName1;
                    formatAddress.address = formatAddress.mailingName1;
                    formatAddress.addr1 = formatAddress.mailingName1;
                }
                if (formatAddress.mailingName2) {
                    formatAddress.mailingName2 = formatAddress.mailingName2.trim();
                    formatAddress.addressLine2 = formatAddress.mailingName2;
                    formatAddress.address2 = formatAddress.mailingName2;
                    formatAddress.addr2 = formatAddress.mailingName2;
                }
                if (formatAddress.mailingName3) {
                    formatAddress.mailingName3 = formatAddress.mailingName3.trim();
                    formatAddress.addressLine3 = formatAddress.mailingName3;
                    formatAddress.address2 = formatAddress.mailingName2 + '' + formatAddress.mailingName3;
                    formatAddress.addr2 = formatAddress.mailingName2 + '' + formatAddress.mailingName3;
                }

                formatAddress.country = {code: 'AU', value: 'AUSTRALIA'};
                console.log("formatAddress in address model::", formatAddress);
                return formatAddress;
            };


            Address.clearValues = function(primaryAddress) {

                var formatAddress = primaryAddress;
                formatAddress.mailingName1 = "";
                formatAddress.mailingName2 = "";
                formatAddress.mailingName3 = "";
                formatAddress.state = "";
                formatAddress.city = "";
                formatAddress.addcity = "";
                formatAddress.pocode = "";
                formatAddress.addr2 = "";
                formatAddress.addr1 = "";
                formatAddress.postCode = "";
                formatAddress.country = {code: 'AU', value: 'AUSTRALIA'};
                return formatAddress;
            };
            element.attr('typeahead', 'address for address in matchList');
            $compile(element.parent())(scope);
            /*scope.address = {};
            scope.address.addressLine1 = "";
            scope.address.addressLine2 = "";
            scope.address.addressLine3 = "";
            scope.address.state = "";
            scope.address.city = "";
            scope.address.pocode = "";*/
            isQASSuccess();
            element.bind('change', function (val) {
                if (val) {
                    captureValue(val);
                    lengthProperty(val);
                }
            });
            function captureValue(address) {
                Address.updateAddress(address);
            }

            function lengthProperty(address) {
                if (address && address.length > 4) {
                    return true;
                } else {
                    return false;
                }
            }

            function clearAddress() {
                scope.vm.addressObj.addressLine1 = "";
                scope.vm.addressObj.addressLine2 = "";
                scope.vm.addressObj.addressLine3 = "";
                scope.vm.addressObj.state = "";
                scope.vm.addressObj.city = "";
                scope.vm.addressObj.pocode = "";
            }

            function isQASSuccess() {
                scope.vm.addressObj.showAddressFields = "N";
                scope.isQASSuccessFlag = true;
                scope.matchList = [];
                var primaryAddress = scope.vm.addressObj;

                Address.isQASSuccess(scope.matchList, primaryAddress, function (isQASSuccessFlg) {
                    scope.isQASSuccessFlag = isQASSuccessFlg;
                    if (scope.isQASSuccessFlag) {
                        scope.vm.addressObj.showAddressFields = 'N';
                    }
                    else {
                        scope.vm.addressObj.showAddressFields = 'Y';
                        primaryAddress = {};
                        clearAddress();
                        scope.vm.addressObj.country = {code: 'AU', value: 'AUSTRALIA', providerCode: 'AU'};
                    }
                    if (scope.vm.addressObj.qasAddress === '') {
                        console.log("qasAddress is empty");
                        if (scope.predictiveAddressPrimary && scope.predictiveAddressPrimary !== '') {
                            scope.vm.addressObj.city = scope.qasAddressPrimary.city;
                            scope.vm.addressObj.pocode = scope.qasAddressPrimary.pocode;
                            scope.vm.addressObj.country = scope.qasAddressPrimary.country;
                            scope.vm.addressObj.state = scope.qasAddressPrimary.state;
                            if (scope.qasAddressPrimary.addressLine1) {
                                scope.vm.addressObj.addressLine1 = scope.qasAddressPrimary.addressLine1.trim();
                            }
                            if (scope.qasAddressPrimary.addressLine2) {
                                scope.vm.addressObj.addressLine2 = scope.qasAddressPrimary.addressLine2.trim();
                            }
                            if (scope.qasAddressPrimary.addressLine3) {
                                scope.vm.addressObj.addressLine3 = scope.qasAddressPrimary.addressLine3.trim();
                            }
                        }
                    } else {
                        console.log("qasAddress is not empty");
                    }
                    console.log("isQASSUccess flag in controller" + scope.isQASSuccessFlag);
                });
                console.log("calling isQASSuccess::::scope.showAddressFields", scope.vm.addressObj.showAddressFields);
                console.log("Final Object:", scope.vm.addressObj.primaryAddress);
                console.log("QAS test::", scope.vm.addressObj.qasAddress);
                if (angular.isUndefined(scope.vm.addressObj.qasAddress) || scope.vm.addressObj.qasAddress === '') {
                    console.log("empty mapping");
                } else {
                    console.log("non-empty mapping");
                }
            }

            scope.checkQASSelected = function(){
                if($('.address').val() && $('.address').val().length >= 5){
                    if(!scope.vm.addressObj.addressLine1){
                        scope.vm.addressObj.showAddressFields = "Y";
                    }
                }
            };
        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs', '$parse', 'contentManagementFactory', '$compile'];

    function Controller($element, $scope, $attrs, $parse, contentManagementFactory, $compile) {

    }

})();
