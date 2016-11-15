(function () {
	'use strict';

	angular.module('appname.factories.reference', []).factory('referenceDataFactory', ReferenceData);
	ReferenceData.$inject = [];

	function ReferenceData() {

		ReferenceData.global = {
					"defaultBrand": "wbc",
					"currentDate": new Date(),
					brands: {
							"wbc": [
									{
											"label": "WBC",
											"value": "wbc"
							},
									{
											"label": "STG",
											"value": "stg"
							},
									{
											"label": "BOM",
											"value": "bom"
							},
									{
											"label": "BSA",
											"value": "bsa"
							}
							],
							"stg": [{
											"label": "STG",
											"value": "stg"
							},
									{
											"label": "BOM",
											"value": "bom"
							},
									{
											"label": "BSA",
											"value": "bsa"
							}]
					},
					listKeyValue: {
							"labelName": "label",
							"valueName": "value"
					},
					validation: {
							"empty": "^\s*$",
							"date": "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$"
					}
			};

			ReferenceData.preferences = {
				"errorCodes": {
						"invalidBsb": "E01"
				},
				"validation": {
						"contactNumber": {
								"validateRegex": "^[0-9]*$",
								"validateMaxlength": "10",
								"validateRegexOnBlur": "^0[0-9]{0,9}$",
								"requiredLength": "10",
								"required": true
						},
						"bsbNumber": {
								"wbc": {
										"prefix": "03",
										"validateRegex": "^[0-9]*$",
										"validateMaxlength": "4",
										"requiredLength": "4",
										"required": true,
								},
								"nonWbc": {
										"prefix": null,
										"validateRegex": "^[0-9]*$",
										"validateMaxlength": "3",
										"requiredLength": "3",
										"required": true,
								}
						}
				}
		};

		ReferenceData.userFactory = {
					"accessBasedOnPermissions": {
							'initiateQuote': 'InitiateQuote',
							'editQuote': 'EditQuote',
							'readOnlyQuote': 'ReadOnlyQuote',
							'brandSwap': 'BrandSwap',
							'subBrandSwap': 'SubBrandSwap',
							'maintainRole': 'MaintainRole',
							'maintainPreference': 'MaintainPreference',
							'defaultPreference': 'DefaultPreference'
					},
					"roles": {
							"wbc": [{
											"label": "Customer Contact Centre",
											"value": "ccc"
							}, {
											"label": "Home Finance Manager",
											"value": "hfm"
							},
									{
											"label": "Pricing Hotline",
											"value": "hotline"
							},
									{
											"label": "Premium Banker",
											"value": "premrm"
							},
									{
											"label": "SME Banker",
											"value": "smerm"
							},
									{
											"label": "WBC Operations team",
											"value": "lmi"
							}],
							"nonWbc": [{
											"label": "Customer Contact Centre",
											"value": "ccc"
							},
									{
											"label": "Pricing Hotline",
											"value": "hotline"
							},
									{
											"label": "Lending Manager",
											"value": "lendmgr"
							},
									{
											"label": "Premium Banker",
											"value": "premrm"
							},
									{
											"label": "SME Banker",
											"value": "smerm"
							},
									{
											"label": "STG Operations team",
											"value": "rlhd"
							}]
					}
			};


		return ReferenceData;
	}

})();
