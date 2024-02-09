import { SHOPIFY_ORDER_FRAGMENT } from "../fragments";

export const SHOPIFY_GET_ORDER_QUERY = /* GraphQL */ `
  query getOrder($id: ID!, $locale: LanguageCode)
  @inContext(language: $locale) {
    node(id: $id) {
      ... on Order {
        ...OrderFragment
      }
    }
  }

  ${SHOPIFY_ORDER_FRAGMENT}
`;
