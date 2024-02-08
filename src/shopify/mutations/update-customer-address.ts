import { SHOPIFY_ADDRESS_FRAGMENT } from "../fragments/address-fragment";
import { SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT } from "../fragments/customer-user-error-fragment";

export const UPDATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
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
