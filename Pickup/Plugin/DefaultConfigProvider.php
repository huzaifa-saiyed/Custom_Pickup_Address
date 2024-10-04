<?php

namespace Kitchen365\Pickup\Plugin;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Magento\Directory\Model\ResourceModel\Region\Collection as RegionCollection;
use Magento\Customer\Model\Session;
use Magento\Customer\Api\CustomerRepositoryInterface;

class DefaultConfigProvider
{
    protected $scopeConfig;
    protected $regionCollection;
    protected $customerSession;
    protected $customerRepository;

    public function __construct(
        ScopeConfigInterface $scopeConfig,
        RegionCollection $regionCollection,
        Session $customerSession,
        CustomerRepositoryInterface $customerRepository
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->regionCollection = $regionCollection;
        $this->customerSession = $customerSession;
        $this->customerRepository = $customerRepository;
    }

    public function afterGetConfig(
        \Magento\Checkout\Model\DefaultConfigProvider $subject,
        $result
    ) {
        $enabled = $this->scopeConfig->getValue('pickup_section/shipping_method_enable/enable', ScopeInterface::SCOPE_STORE);
        $result['pickup_address']['shipping_method_config_enable'] = $enabled;

        if (!$enabled) {
            unset($result['pickup_address']);
            return $result;
        }

        $customerId = $this->customerSession->getId();
        if ($customerId) {
            $customerData = $this->customerRepository->getById($customerId);
            $result['pickup_address']['firstname'] = $customerData->getFirstname();
            $result['pickup_address']['lastname'] = $customerData->getLastname();
        }

        $addressConfig = [
            'street' => [
                $this->scopeConfig->getValue('pickup_section/customer_address_config_group/street_line1', ScopeInterface::SCOPE_STORE),
                $this->scopeConfig->getValue('pickup_section/customer_address_config_group/street_line2', ScopeInterface::SCOPE_STORE)
            ],
            'countryId' => $this->scopeConfig->getValue('pickup_section/customer_address_config_group/country_id', ScopeInterface::SCOPE_STORE),
            'regionId' => $this->scopeConfig->getValue('pickup_section/customer_address_config_group/region_id', ScopeInterface::SCOPE_STORE),
            'city' => $this->scopeConfig->getValue('pickup_section/customer_address_config_group/city', ScopeInterface::SCOPE_STORE),
            'postcode' => $this->scopeConfig->getValue('pickup_section/customer_address_config_group/postcode', ScopeInterface::SCOPE_STORE),
            'telephone' => $this->scopeConfig->getValue('pickup_section/customer_address_config_group/phone_number', ScopeInterface::SCOPE_STORE),
            'shipping_method_enable' => $this->scopeConfig->getValue('pickup_section/shipping_method_config/enabled_method', ScopeInterface::SCOPE_STORE)
        ];

        $addressConfig['region'] = $this->getRegionNameById($addressConfig['regionId']);
        $result['pickup_address'] = array_merge($result['pickup_address'], $addressConfig);

        return $result;
    }

    protected function getRegionNameById(int $id): string
    {
        $region = $this->regionCollection->getItemById($id);
        return $region ? $region->getName() : '';
    }
}
