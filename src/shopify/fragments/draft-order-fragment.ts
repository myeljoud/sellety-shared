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
    email
    name
    ready
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
