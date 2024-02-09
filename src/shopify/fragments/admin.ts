import { SHOPIFY_ADDRESS_FRAGMENT } from "./address-fragment";
import {
  SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT,
  SHOPIFY_METAFIELD_FRAGMENT,
  SHOPIFY_MONEY_BAG_FRAGMENT,
  SHOPIFY_PRODUCT_PRICE_RANGE_V2_FRAGMENT,
} from "./common";

/* -------------------------------------------------------------------------- */
/*                       Shopify admin common fragments                       */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_SHIPPING_LINE_FRAGMENT = /* GraphQL */ `
  fragment AdminShippingLineFragment on ShippingLine {
    id
    title
    shippingRateHandle
    originalPriceSet {
      ...MoneyBagFragment
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                     Shopify products related fragments                     */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment AdminProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    inventoryQuantity
    selectedOptions {
      name
      value
    }
    price
    compareAtPrice
    image {
      id
      width
      height
      altText
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
    inventoryItem {
      requiresShipping
    }
  }
`;

export const SHOPIFY_ADMIN_PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment AdminProductFragment on Product {
    id
    handle
    title
    vendor
    collections(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
    description
    descriptionHtml
    featuredImage {
      id
      width
      height
      altText
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
    images(first: 10) {
      edges {
        node {
          id
          width
          height
          altText
          url(transform: { maxHeight: 700, maxWidth: 700 })
        }
      }
    }
    options {
      id
      name
      values
    }
    priceRangeV2 {
      ...ProductPriceRangeV2Fragment
    }
    seo {
      title
      description
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

  ${SHOPIFY_PRODUCT_PRICE_RANGE_V2_FRAGMENT}
  ${SHOPIFY_METAFIELD_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                       Shopify draft orders fragments                       */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminDraftOrderFragment on DraftOrder {
    completedAt
    createdAt
    updatedAt
    currencyCode
    email
    id
    name
    note2
    phone
    ready
    customer {
      id
    }
    lineItems(first: 50) {
      edges {
        node {
          id
          name
          image {
            ...ImageWithoutUrlFragment
            url(transform: { maxHeight: 450, maxWidth: 450 })
          }
          originalTotal
          originalUnitPrice
          totalDiscount
          quantity
          variantTitle
          vendor
          product {
            id
            handle
            title
          }
        }
      }
    }
    lineItemsSubtotalPrice {
      ...MoneyBagFragment
    }
    shippingAddress {
      ...AddressFragment
    }
    shippingLine {
      ...AdminShippingLineFragment
    }
    status
    subtotalPrice
    totalDiscountsSet {
      ...MoneyBagFragment
    }
    totalLineItemsPriceSet {
      ...MoneyBagFragment
    }
    totalPrice
    totalShippingPrice
    totalTax
  }

  ${SHOPIFY_MONEY_BAG_FRAGMENT}
  ${SHOPIFY_ADMIN_SHIPPING_LINE_FRAGMENT}
  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
`;

export const SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminCalculatedDraftOrderFragment on CalculatedDraftOrder {
    availableShippingRates {
      handle
      price {
        amount
        currencyCode
      }
      title
    }
  }
`;
