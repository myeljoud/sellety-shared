import {
  SHOPIFY_ADDRESS_FRAGMENT,
  SHOPIFY_CART_FRAGMENT,
  SHOPIFY_CART_USER_ERROR_FRAGMENT,
  SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT,
} from "../fragments";

/* -------------------------------------------------------------------------- */
/*                           Shopify cart mutations                           */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CART_CREATE_MUTATION = /* GraphQL */ `
  mutation cartCreate($input: CartInput, $locale: LanguageCode)
  @inContext(language: $locale) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...CartUserErrorFragment
      }
    }
  }

  ${SHOPIFY_CART_FRAGMENT}
  ${SHOPIFY_CART_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation cartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...CartUserErrorFragment
      }
    }
  }

  ${SHOPIFY_CART_FRAGMENT}
  ${SHOPIFY_CART_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation cartLinesUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...CartUserErrorFragment
      }
    }
  }

  ${SHOPIFY_CART_FRAGMENT}
  ${SHOPIFY_CART_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation cartLinesRemove(
    $cartId: ID!
    $lineIds: [ID!]!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...CartUserErrorFragment
      }
    }
  }

  ${SHOPIFY_CART_FRAGMENT}
  ${SHOPIFY_CART_USER_ERROR_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                         Shopify customer mutations                         */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CUSTOMER_CREATE_MUTATION = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const SHOPIFY_CUSTOMER_UPDATE_MUTATION = /* GraphQL */ `
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                       Shopify customer auth mutations                      */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const SHOPIFY_CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION = /* GraphQL */ `
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                     Shopify customer address mutations                     */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CUSTOMER_ADDRESS_CREATE_MUTATION = /* GraphQL */ `
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        ...AddressFragment
      }
      customerUserErrors {
        ...CustomerUserErrorFragment
      }
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CUSTOMER_ADDRESS_UPDATE_MUTATION = /* GraphQL */ `
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        ...AddressFragment
      }
      customerUserErrors {
        ...CustomerUserErrorFragment
      }
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CUSTOMER_ADDRESS_DELETE_MUTATION = /* GraphQL */ `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        ...CustomerUserErrorFragment
      }
      deletedCustomerAddressId
    }
  }

  ${SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT}
`;

export const SHOPIFY_CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION = /* GraphQL */ `
  mutation customerDefaultAddressUpdate(
    $addressId: ID!
    $customerAccessToken: String!
  ) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        id
      }
      customerUserErrors {
        ...CustomerUserErrorFragment
      }
    }
  }

  ${SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT}
`;
