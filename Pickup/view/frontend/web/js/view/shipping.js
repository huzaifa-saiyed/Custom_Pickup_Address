define([
    'jquery',
    'underscore',
    'ko',
    'Magento_Customer/js/model/address-list',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/create-shipping-address',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/checkout-data'
], function (
    $,
    _,
    ko,
    addressList,
    quote,
    createShippingAddress,
    selectShippingAddress,
    checkoutData
) {
    'use strict'; 

    var shipping = {
        customAddressSet: false, 
        preventReload: false, 
 
        isAddressTitle: ko.computed(function () {
            var shippingMethod = quote.shippingMethod() ? quote.shippingMethod()['carrier_code'] + '_' + quote.shippingMethod()['method_code'] : null;
            
            if (window.checkoutConfig.pickup_address && window.checkoutConfig.pickup_address.shipping_method_config_enable && (shippingMethod == window.checkoutConfig.pickup_address.shipping_method_enable)) {
                return true;
            } else {
                return false;
            }
        }),
 
        initObservable: function () {
            this._super();

            if (!window.checkoutConfig.pickup_address || !window.checkoutConfig.pickup_address.shipping_method_config_enable) {
                return this;
            }

            this.selectedMethod = ko.computed(function() {
                var selectedMethod = quote.shippingMethod() ? quote.shippingMethod()['carrier_code'] + '_' + quote.shippingMethod()['method_code'] : null;

                if (window.checkoutConfig.pickup_address && window.checkoutConfig.pickup_address.shipping_method_config_enable && (selectedMethod == window.checkoutConfig.pickup_address.shipping_method_enable)) {
                    this.handleCustomAddress();
                } else {
                    this.handleDefaultAddress();
                }

                return selectedMethod;
            }, this);

            return this; 
        },
 
        handleCustomAddress: function() {
            if (!this.customAddressSet) {
                var customAddress = window.checkoutConfig.pickup_address;

                if (customAddress && window.checkoutConfig.pickup_address.shipping_method_config_enable) {
                    var newShippingAddress = createShippingAddress(customAddress);
                    selectShippingAddress(newShippingAddress);
                    checkoutData.setSelectedShippingAddress(newShippingAddress.getKey());
                    this.customAddressSet = true; 
                }
            }
        },
 
        handleDefaultAddress: function() {
            this.customAddressSet = false; 

            var hasNewAddress = addressList.some(function (address) {
                return address.getType() === 'new-customer-address'; 
            });

            if (hasNewAddress) {
                var defaultAddress = _.find(addressList(), function (address) {
                    return address.isDefaultShipping();
                }) || addressList()[0]; 

                if (!this.preventReload) {
                    this.preventReload = true; 
                    window.location.reload();
                }
                selectShippingAddress(defaultAddress);
                checkoutData.setSelectedShippingAddress(defaultAddress.getKey());
            } 
        }
    }; 

    return function (target) {
        return target.extend(shipping);
    };
});
