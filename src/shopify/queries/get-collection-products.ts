import { SHOPIFY_PRODUCT_FRAGMENT } from "../fragments";

export const SHOPIFY_GET_COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query getCollectionById(
    $id: ID
    $handle: String
    $first: Int
    $after: String
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    collection(handle: $handle) {
      products(first: $first, after: $after) {
        pageInfo {
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }
        edges {
          cursor
          node {
            ...ProductFragment
          }
        }
      }
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;
