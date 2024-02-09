import { SHOPIFY_ADDRESS_FRAGMENT } from "../fragments/address-fragment";

export const SHOPIFY_GET_CUSTOMER_ADDRESS_QUERY = /* GraphQL */ `
  query getCustomerAddress($customerAccessToken: String!, $locale: LanguageCode)
  @inContext(language: $locale) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        ...AddressFragment
      }
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
`;
