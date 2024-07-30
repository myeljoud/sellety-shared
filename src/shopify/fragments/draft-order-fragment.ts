import { SHOPIFY_ADDRESS_FRAGMENT } from "./address-fragment";
import { SHOPIFY_ADMIN_SHIPPING_LINE_FRAGMENT } from "./admin";
import {
  SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT,
  SHOPIFY_MONEY_BAG_FRAGMENT,
} from "./common";

export const SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT = /* GraphQL */ `
  fragment AdminDraftOrderFragment on DraftOrder {
    id
    completedAt
    createdAt
    updatedAt
    # email
    name
    ready
    lineItems(first: 30) {
      edges {
        node {
          id
          name
          originalTotal
          quantity
          product {
            id
            handle
            title
            vendor
            description
            descriptionHtml
            options {
              id
              name
              values
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              maxVariantCompareAtPrice {
                amount
                currencyCode
              }
            }
            variants(first: 20) {
              edges {
                node {
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
                    ...ImageWithoutUrlFragment
                    url(transform: { maxHeight: 450, maxWidth: 450 })
                  }
                  inventoryItem {
                    requiresShipping
                  }
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
            collections(first: 20) {
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
              id
              key
              namespace
              value
            }
            numberOfReviews: metafield(
              namespace: "reviews"
              key: "rating_count"
            ) {
              id
              key
              namespace
              value
            }
            averageRating: metafield(namespace: "reviews", key: "rating") {
              id
              key
              namespace
              value
            }
          }
        }
      }
    }
    # shippingAddress {
    #   ...AddressFragment
    # }
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
