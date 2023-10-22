export const SHOPIFY_ADDRESS_FRAGMENT = /* GraphQL */ `
  fragment AddressFragment on MailingAddress {
    id
    address1
    address2
    city
    country
    firstName
    lastName
    phone
  }
`;

export const SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT = /* GraphQL */ `
  fragment ImageWithoutUrlFragment on Image {
    id
    width
    height
    altText
  }
`;

export const SHOPIFY_IMAGE_WITH_URL_FRAGMENT = /* GraphQL */ `
  fragment ImageWithUrlFragment on Image {
    ...ImageWithoutUrlFragment
    url
  }

  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
`;

export const SHOPIFY_MONEY_BAG_FRAGMENT = /* GraphQL */ `
  fragment MoneyBagFragment on MoneyBag {
    presentmentMoney {
      amount
      currencyCode
    }
    shopMoney {
      amount
      currencyCode
    }
  }
`;

export const SHOPIFY_MONEY_V2_FRAGMENT = /* GraphQL */ `
  fragment MoneyV2Fragment on MoneyV2 {
    amount
    currencyCode
  }
`;

export const SHOPIFY_PRODUCT_PRICE_RANGE_V2_FRAGMENT = /* GraphQL */ `
  fragment ProductPriceRangeV2Fragment on ProductPriceRangeV2 {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
`;

export const SHOPIFY_METAFIELD_FRAGMENT = /* GraphQL */ `
  fragment MetafieldFragment on Metafield {
    id
    key
    namespace
    value
  }
`;
