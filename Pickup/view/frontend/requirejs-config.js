/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            // 'Magento_Checkout/js/view/shipping-address/address-renderer/default': {
            //     'Kitchen365_Pickup/js/view/shipping-address/address-renderer/default': true
            // },
            // 'Magento_Checkout/js/view/shipping-information': {
            //     'Kitchen365_Pickup/js/view/shipping-information': true
            // } 
            'Magento_Checkout/js/view/shipping': {
                'Kitchen365_Pickup/js/view/shipping': true
            },
            'Magento_Checkout/js/view/shipping-address/list': {
                'Kitchen365_Pickup/js/view/shipping-address/list': true
            },
        }
    },
    map: {
       '*': { 
           "Magento_Checkout/template/shipping.html" : "Kitchen365_Pickup/template/shipping.html",
           "Magento_Checkout/template/shipping-address/list.html" : "Kitchen365_Pickup/template/shipping-address/list.html",
        //    'Magento_Checkout/js/view/shipping-information': 'Kitchen365_Pickup/js/view/shipping-information',
        //    "Magento_Checkout/template/shipping-information" : "Kitchen365_Pickup/template/shipping-information",
        //    "Magento_Checkout/template/shipping-address/address-renderer/default.html" : "Kitchen365_Pickup/template/shipping-address/address-renderer/default.html"
       }
    },
    paths: {
        'Magento_Checkout/template/shipping-information': 'Kitchen365_Pickup/template/shipping-information',
        'Magento_Checkout/js/view/shipping-information': 'Kitchen365_Pickup/js/view/shipping-information',
        'Magento_Checkout/template/shipping-information/list': 'Kitchen365_Pickup/template/shipping-information/list',
        'Magento_Checkout/js/view/shipping-information/list': 'Kitchen365_Pickup/js/view/shipping-information/list',
        'Magento_Checkout/template/shipping-information/address-renderer/default': 'Kitchen365_Pickup/template/shipping-information/address-renderer/default',
        'Magento_Checkout/js/view/shipping-information/address-renderer/default': 'Kitchen365_Pickup/js/view/shipping-information/address-renderer/default',
    }
};
