/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/shipping-address/form-popup-state',
    'Magento_Checkout/js/checkout-data',
    'Magento_Customer/js/customer-data'
], function (
    $, 
    ko, 
    Component, 
    _, 
    selectShippingAddressAction, 
    quote, 
    formPopUpState, 
    checkoutData, 
    customerData
) {
    'use strict';

    var defaultShipping = {
        isAddress: ko.computed(function () {
            var shippingMethod = quote.shippingMethod() ? quote.shippingMethod()['carrier_code'] + '_' + quote.shippingMethod()['method_code'] : null;
            if (window.checkoutConfig.pickup_address && (shippingMethod == window.checkoutConfig.pickup_address.shipping_method_enable)) {
                return true;
            } else {
                return false;
            }
        }),

        pickupAddress: ko.observable(),

        /** @inheritdoc */
        initObservable: function () {
            this._super();

            this.pickupAddress(window.checkoutConfig.pickup_address);

            return this;
        },
    }

    return function (target) {
        return target.extend(defaultShipping);
    };
});
