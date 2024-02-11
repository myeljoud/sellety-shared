import {
  SHOPIFY_CART_FRAGMENT,
  SHOPIFY_CUSTOMER_FRAGMENT,
  SHOPIFY_ORDER_FRAGMENT,
  SHOPIFY_PRODUCT_FRAGMENT,
} from "../fragments";

export const SHOPIFY_GET_CUSTOMER_QUERY = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!, $locale: LanguageCode)
  @inContext(language: $locale) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerFragment
    }
  }

  ${SHOPIFY_CUSTOMER_FRAGMENT}
`;

export const SHOPIFY_GET_CART_BY_ID_QUERY = /* GraphQL */ `
  query getCartById($id: ID!, $locale: LanguageCode)
  @inContext(language: $locale) {
    cart(id: $id) {
      ...CartFragment
    }
  }

  ${SHOPIFY_CART_FRAGMENT}
`;

export const SHOPIFY_GET_COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query getCollectionById($handle: String!, $locale: LanguageCode)
  @inContext(language: $locale) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        title
        description
      }
      updatedAt
    }
  }
`;

export const SHOPIFY_GET_COLLECTION_PRODUCTS_BY_HANDLE_QUERY = /* GraphQL */ `
  query getCollectionById(
    $handle: String!
    $first: Int!
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

export const SHOPIFY_GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query getProductByHandle($handle: String!, $locale: LanguageCode)
  @inContext(language: $locale) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;

export const SHOPIFY_GET_PRODUCTS_BY_IDS_QUERY = /* GraphQL */ `
  query getProductsByIds($ids: [ID!]!, $locale: LanguageCode)
  @inContext(language: $locale) {
    nodes(ids: $ids) {
      id
      ... on Product {
        ...ProductFragment
      }
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;

export const SHOPIFY_GET_PRODUCTS_BY_QUERY = /* GraphQL */ `
  query getProductsByQuery(
    $query: String!
    $first: Int!
    $after: String
    $before: String
    $last: Int
    $reverse: Boolean
    $sortKey: ProductSortKeys
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    products(
      first: $first
      query: $query
      after: $after
      before: $before
      last: $last
      reverse: $reverse
      sortKey: $sortKey
    ) {
      pageInfo {
        hasNextPage
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

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;

export const SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY = /* GraphQL */ `
  query getProductRecommendations(
    $productId: ID!
    $intent: ProductRecommendationIntent!
    $locale: LanguageCode
  ) @inContext(language: $locale) {
    productRecommendations(productId: $productId, intent: $intent) {
      ...ProductFragment
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;
