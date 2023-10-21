import {
  SHOPIFY_CUSTOMER_EXTRA_DATA_MF_KEY,
  SHOPIFY_CUSTOMER_EXTRA_DATA_MF_NAMESPACE,
} from "../../constants";
import {
  SHOPIFY_ADDRESS_FRAGMENT,
  SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT,
  SHOPIFY_METAFIELD_FRAGMENT,
  SHOPIFY_PRODUCT_PRICE_RANGE_FRAGMENT,
} from "./common";

/* -------------------------------------------------------------------------- */
/*                     Shopify products related fragments                     */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    quantityAvailable
    availableForSale
    requiresShipping
    selectedOptions {
      name
      value
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      ...ImageWithoutUrlFragment
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
  }
`;

export const SHOPIFY_PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    id
    handle
    availableForSale
    title
    vendor
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          ...ProductVariantFragment
        }
      }
    }
    images(first: 10) {
      edges {
        node {
          ...ImageWithoutUrlFragment
          url(transform: { maxHeight: 700, maxWidth: 700 })
        }
      }
    }
    featuredImage {
      ...ImageWithoutUrlFragment
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
    seo {
      title
      description
    }
    collections(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
    tags
    updatedAt
    brand: metafield(namespace: "custom", key: "product_brand") {
      ...MetafieldFragment
    }
    numberOfReviews: metafield(namespace: "reviews", key: "rating_count") {
      ...MetafieldFragment
    }
    averageRating: metafield(namespace: "reviews", key: "rating") {
      ...MetafieldFragment
    }
  }

  ${SHOPIFY_PRODUCT_VARIANT_FRAGMENT}
  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
  ${SHOPIFY_METAFIELD_FRAGMENT}
`;

export const SHOPIFY_PRODUCT_THUMBNAIL_FRAGMENT = /* GraphQL */ `
  fragment ProductThumbnailFragment on Product {
    title
    featuredImage {
      ...ImageWithoutUrlFragment
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
    vendor
    id
    handle
    priceRange {
      ...ProductPriceRangeFragment
    }
    compareAtPriceRange {
      ...ProductPriceRangeFragment
    }
    tags
    brand: metafield(namespace: "custom", key: "product_brand") {
      ...MetafieldFragment
    }
    numberOfReviews: metafield(namespace: "reviews", key: "rating_count") {
      ...MetafieldFragment
    }
    averageRating: metafield(namespace: "reviews", key: "rating") {
      ...MetafieldFragment
    }
    variants(first: 20) {
      nodes {
        ...ProductVariantFragment
      }
    }
  }

  ${SHOPIFY_PRODUCT_VARIANT_FRAGMENT}
  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
  ${SHOPIFY_PRODUCT_PRICE_RANGE_FRAGMENT}
  ${SHOPIFY_METAFIELD_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                       Shopify cart related fragments                       */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CART_FRAGMENT = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    totalQuantity
    note
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              ...ProductVariantFragment
              product {
                ...ProductFragment
              }
            }
          }
        }
      }
    }
  }

  ${SHOPIFY_PRODUCT_FRAGMENT}
`;

export const SHOPIFY_CART_USER_ERROR_FRAGMENT = /* GraphQL */ `
  fragment CartUserErrorFragment on CartUserError {
    field
    message
    code
  }
`;

/* -------------------------------------------------------------------------- */
/*                      Shopify orders related fragments                      */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_DISCOUNT_APPLICATION_FRAGMENT = /* GraphQL */ `
  fragment DiscountApplicationFragment on DiscountApplication {
    allocationMethod
    targetSelection
    targetType
    value {
      ... on MoneyV2 {
        amount
      }
    }
  }
`;

export const SHOPIFY_ORDER_LINE_ITEM_FRAGMENT = /* GraphQL */ `
  fragment OrderLineItemFragment on OrderLineItem {
    
  }
`;

export const SHOPIFY_ORDER_FRAGMENT = /* GraphQL */ `
  fragment OrderFragment on Order {
    id
    canceledAt
    email
    financialStatus
    fulfillmentStatus
    lineItems(first: 250) {
      edges {
        node {
          currentQuantity
          originalTotalPrice {
            amount
            currencyCode
          }
          quantity
          title
          variant {
            ...ProductVariantFragment
            product {
              ...ProductFragment
            }
          }
        }
      }
    }
    name
    orderNumber
    processedAt
    shippingAddress {
      ...AddressFragment
    }
    totalPrice {
      amount
      currencyCode
    }
    totalShippingPrice {
      amount
      currencyCode
    }
    totalTax {
      amount
      currencyCode
    }
    currentSubtotalPrice {
      amount
      currencyCode
    }
    currentTotalPrice {
      amount
      currencyCode
    }
    currentTotalTax {
      amount
      currencyCode
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_PRODUCT_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                     Shopify customers related fragments                    */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_CUSTOMER_FRAGMENT = /* GraphQL */ `
  fragment CustomerFragment on Customer {
    id
    createdAt
    updatedAt
    displayName
    email
    firstName
    lastName
    phone
    numberOfOrders
    defaultAddress {
      ...AddressFragment
    }
    addresses(first: 10) {
      edges {
        node {
          ...AddressFragment
        }
      }
    }
    orders(first: 100, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderFragment
        }
      }
    }
    extraData: metafield(namespace: "${SHOPIFY_CUSTOMER_EXTRA_DATA_MF_NAMESPACE}", key: "${SHOPIFY_CUSTOMER_EXTRA_DATA_MF_KEY}") {
      ...MetafieldFragment
    }
  }

  ${SHOPIFY_ORDER_FRAGMENT}
`;

export const SHOPIFY_CUSTOMER_USER_ERROR_FRAGMENT = /* GraphQL */ `
  fragment CustomerUserErrorFragment on CustomerUserError {
    code
    field
    message
  }
`;
