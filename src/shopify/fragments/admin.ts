import {
  SHOPIFY_ADDRESS_FRAGMENT,
  SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT,
  SHOPIFY_METAFIELD_FRAGMENT,
  SHOPIFY_MONEY_BAG_FRAGMENT,
  SHOPIFY_PRODUCT_PRICE_RANGE_FRAGMENT,
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

  ${SHOPIFY_MONEY_BAG_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                     Shopify products related fragments                     */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment AdminProductVariantFragment on ProductVariant {
    inventoryQuantity
    availableForSale
    compareAtPrice
    id
    displayName
    inventoryQuantity
    selectedOptions {
      name
      value
    }
    price
    title
  }
`;

export const SHOPIFY_ADMIN_PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment AdminProductThumbnailFragment on Product {
    title
    featuredImage {
      ...ImageWithoutUrlFragment
      url(transform: { maxHeight: 450, maxWidth: 450 })
    }
    vendor
    id
    handle
    priceRangeV2 {
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
  }

  ${SHOPIFY_PRODUCT_PRICE_RANGE_FRAGMENT}
  ${SHOPIFY_METAFIELD_FRAGMENT}
  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
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
    order {
      id
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
`;

export const SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminCalculatedDraftOrderFragment on CalculatedDraftOrder {
    availableShippingRates {
      handle
      price {
        money
      }
      title
    }
  }
`;
