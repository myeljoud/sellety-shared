import { SHOPIFY_PRODUCT_FRAGMENT } from "../fragments";

export const SHOPIFY_GET_PRODUCT_QUERY = /* GraphQL */ `
  query getProduct($id: ID, $handle: String, $locale: LanguageCode)
  @inContext(language: $locale) {
    product(id: $id, handle: $handle) {
      ...ProductFragment
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;
