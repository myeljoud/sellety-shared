import { SHOPIFY_ADDRESS_FRAGMENT } from "../fragments/address-fragment";
import { SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT } from "../fragments/customer-user-error-fragment";

export const SHOPIFY_CREATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        ...Address
      }
      customerUserErrors {
        ...CustomerUserError
      }
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT}
`;
