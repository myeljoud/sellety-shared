import { SHOPIFY_ORDER_FRAGMENT } from "../fragments";

export const SHOPIFY_GET_CUSTOMER_ORDERS = /* GraphQL */ `
  query getCustomerOrders($customerAccessToken: String!, $locale: LanguageCode)
  @inContext(language: $locale) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            ...OrderFragment
          }
        }
      }
    }
  }

  ${SHOPIFY_ORDER_FRAGMENT}
`;
