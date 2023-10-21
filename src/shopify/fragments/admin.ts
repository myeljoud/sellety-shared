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

export const SHOPIFY_ADMIN_DISCOUNT_APPLICATION_FRAGMENT = /* GraphQL */ `
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

export const SHOPIFY_ADMIN_PRODUCT_THUMBNAIL_FRAGMENT = /* GraphQL */ `
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

/**
 * This fragment needs `MoneyBagFragment` to be added to its parent
 */
export const SHOPIFY_ADMIN_DRAFT_ORDER_APPLIED_DISCOUNT_FRAGMENT = /* GraphQL */ `
  fragment AdminDraftOrderAppliedDiscountFragment on DraftOrderAppliedDiscount {
    description
    title
    value
    valueType
    amountSet {
      ...MoneyBagFragment
    }
    amountV2 {
      money
    }
  }
`;

export const SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminDraftOrderFragment on DraftOrder {
    appliedDiscount {
      ...AdminDraftOrderAppliedDiscountFragment
    }
    billingAddressMatchesShippingAddress
    completedAt
    createdAt
    currencyCode
    customAttributes {
      key
      value
    }
    customer {
      id
    }
    email
    id
    invoiceUrl
    lineItems(first: 50) {
      nodes {
        id
        image {
          ...ImageWithoutUrlFragment
          url(transform: { maxHeight: 450, maxWidth: 450 })
        }
        originalTotal
        originalUnitPrice
        quantity
        variant {
          ...AdminProductVariantFragment
          product {
            ...AdminProductThumbnailFragment
            variants(first: 1) {
              nodes {
                compareAtPrice
              }
            }
          }
        }
      }
    }
    lineItemsSubtotalPrice {
      ...MoneyBagFragment
    }
    name
    note2
    phone
    presentmentCurrencyCode
    purchasingEntity {
      ... on Customer {
        id
      }
    }
    ready
    reserveInventoryUntil
    shippingAddress {
      ...AddressFragment
    }
    shippingLine {
      ...AdminShippingLineFragment
    }
    status
    subtotalPrice
    tags
    taxesIncluded
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
  ${SHOPIFY_ADMIN_DRAFT_ORDER_APPLIED_DISCOUNT_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_THUMBNAIL_FRAGMENT}
`;

export const SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminCalculatedDraftOrderFragment on CalculatedDraftOrder {
    appliedDiscount {
      ...AdminDraftOrderAppliedDiscountFragment
    }
    availableShippingRates {
      handle
      price {
        money
      }
      title
    }
    billingAddressMatchesShippingAddress
    customer {
      displayName
    }
    currencyCode
    lineItems {
      appliedDiscount {
        ...AdminDraftOrderAppliedDiscountFragment
      }
      custom
      discountedTotal {
        money
      }
      discountedUnitPrice {
        money
      }
      image {
        ...ImageWithoutUrlFragment
        url(transform: { maxHeight: 450, maxWidth: 450 })
      }
      name
      originalTotal {
        money
      }
      originalUnitPrice {
        money
      }
      quantity
      title
      totalDiscount {
        money
      }
      vendor
      variant {
        id
      }
    }
    lineItemsSubtotalPrice {
      ...MoneyBagFragment
    }
    marketName
    marketRegionCountryCode
    phone
    presentmentCurrencyCode
    purchasingEntity {
      ... on Customer {
        displayName
      }
    }
    shippingLine {
      ...AdminShippingLineFragment
    }
    subtotalPrice
    totalDiscountsSet {
      ...MoneyBagFragment
    }
    totalPrice
    totalShippingPrice
  }

  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
  ${SHOPIFY_MONEY_BAG_FRAGMENT}
  ${SHOPIFY_ADMIN_SHIPPING_LINE_FRAGMENT}
  ${SHOPIFY_ADMIN_DRAFT_ORDER_APPLIED_DISCOUNT_FRAGMENT}
`;

/* -------------------------------------------------------------------------- */
/*                          Shopify orders fragments                          */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminOrderFragment on Order {
    billingAddressMatchesShippingAddress
    cancelledAt
    cancelReason
    canMarkAsPaid
    canNotifyCustomer
    createdAt
    currencyCode
    currentSubtotalLineItemsQuantity
    currentSubtotalPriceSet {
      ...MoneyBagFragment
    }
    currentTotalDiscountsSet {
      ...MoneyBagFragment
    }
    currentTotalDutiesSet {
      ...MoneyBagFragment
    }
    currentTotalPriceSet {
      ...MoneyBagFragment
    }
    currentTotalTaxSet {
      ...MoneyBagFragment
    }
    customAttributes {
      key
      value
    }
    customer {
      id
    }
    discountCodes
    displayAddress {
      ...AddressFragment
    }
    displayFinancialStatus
    displayFulfillmentStatus
    edited
    email
    fullyPaid
    id
    name
    netPaymentSet {
      ...MoneyBagFragment
    }
    note
    phone
    processedAt
    purchasingEntity {
      ... on Customer {
        id
      }
    }
    requiresShipping
    shippingAddress {
      ...AddressFragment
    }
    shippingLine {
      ...AdminShippingLineFragment
    }
    tags
    totalShippingPriceSet {
      ...MoneyBagFragment
    }
    totalRefundedShippingSet {
      ...MoneyBagFragment
    }
    unpaid
    updatedAt
    discountApplications(first: 10) {
      nodes {
        ...DiscountApplicationFragment
      }
    }
    lineItems(first: 20) {
      nodes {
        id
        currentQuantity
        customAttributes {
          key
          value
        }
        originalTotalSet {
          ...MoneyBagFragment
        }
        originalUnitPriceSet {
          ...MoneyBagFragment
        }
        quantity
        requiresShipping
        variant {
          ...AdminProductVariantFragment
          product {
            ...AdminProductThumbnailFragment
            variants(first: 1) {
              nodes {
                compareAtPrice
              }
            }
          }
        }
      }
    }
  }

  ${SHOPIFY_ADMIN_DISCOUNT_APPLICATION_FRAGMENT}
  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_ADMIN_SHIPPING_LINE_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_THUMBNAIL_FRAGMENT}
`;
