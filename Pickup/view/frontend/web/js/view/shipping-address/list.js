/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'underscore',
    'ko',
    'mageUtils',
    'uiComponent',
    'uiLayout',
    'Magento_Customer/js/model/address-list',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/customer-data'
], function (
    _, 
    ko, 
    utils, 
    Component, 
    layout, 
    addressList,
    quote,
    customerData
) {
    'use strict';

    var countryData = customerData.get('directory-data');

    var listShipping = {
        isAddress: ko.computed(function () {
            var shippingMethod = quote.shippingMethod() ? quote.shippingMethod()['carrier_code'] + '_' + quote.shippingMethod()['method_code'] : null;
            if (window.checkoutConfig.pickup_address && (shippingMethod == window.checkoutConfig.pickup_address.shipping_method_enable)) {
                return true;
            } else {
                return false;
            }
        }),


        pickAddress: function () {
            return window.checkoutConfig.pickup_address;
        },

        getCountryName: function (countryId) {
            return countryData()[countryId] != undefined ? countryData()[countryId].name : ''; //eslint-disable-line
        },
    };

    return function (target) {
        return target.extend(listShipping);
    };
});
