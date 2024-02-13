import { SHOPIFY_CART_ITEMS_LIMIT } from "../../constants";
import {
  SHOPIFY_ADDRESS_FRAGMENT,
  SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT,
  SHOPIFY_ADMIN_PRODUCT_FRAGMENT,
  SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT,
  SHOPIFY_MONEY_BAG_FRAGMENT,
} from "../fragments";
import { SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT } from "../fragments/draft-order-fragment";

/* -------------------------------------------------------------------------- */
/*                        Shopify draft order mutations                       */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_DRAFT_ORDER_CREATE_MUTATION = /* GraphQL */ `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        ...AdminDraftOrderFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT}
`;

export const SHOPIFY_ADMIN_DRAFT_ORDER_CALCULATE_MUTATION = /* GraphQL */ `
  mutation draftOrderCalculate($input: DraftOrderInput!) {
    draftOrderCalculate(input: $input) {
      calculatedDraftOrder {
        ...AdminCalculatedDraftOrderFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT}
`;

export const SHOPIFY_ADMIN_DRAFT_ORDER_UPDATE_MUTATION = /* GraphQL */ `
  mutation draftOrderUpdate($id: ID!, $input: DraftOrderInput!) {
    draftOrderUpdate(id: $id, input: $input) {
      draftOrder {
        ...AdminDraftOrderFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT}
`;

export const SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION = /* GraphQL */ `
  mutation draftOrderComplete($id: ID!, $paymentPending: Boolean) {
    draftOrderComplete(id: $id, paymentPending: $paymentPending) {
      draftOrder {
        order {
          id
          email
          cancelledAt
          displayFinancialStatus
          displayFulfillmentStatus
          lineItems(first: ${SHOPIFY_CART_ITEMS_LIMIT}) {
            edges {
              node {
                currentQuantity
                variantTitle
                quantity
                title
                vendor
                image {
                  ...ImageWithoutUrlFragment
                  url(transform: { maxHeight: 700, maxWidth: 700 })
                }
                originalTotalSet {
                  ...MoneyBagFragment
                }
                product {
                  handle
                }
              }
            }
          }
          name
          poNumber
          processedAt
          shippingAddress {
            ...AddressFragment
          }
          totalPriceSet {
            ...MoneyBagFragment
          }
          totalShippingPriceSet {
            ...MoneyBagFragment
          }
          totalTaxSet {
            ...MoneyBagFragment
          }
          currentSubtotalPriceSet {
            ...MoneyBagFragment
          }
          currentTotalPriceSet {
            ...MoneyBagFragment
          }
          currentTotalTaxSet {
            ...MoneyBagFragment
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }

  ${SHOPIFY_ADDRESS_FRAGMENT}
  ${SHOPIFY_MONEY_BAG_FRAGMENT}
  ${SHOPIFY_IMAGE_WITHOUT_URL_FRAGMENT}
`;

export const SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_SIMPLE_MUTATION = /* GraphQL */ `
  mutation draftOrderComplete(
    $id: ID!
    $paymentPending: Boolean
    $paymentGatewayId: ID
    $sourceName: String
  ) {
    draftOrderComplete(
      id: $id
      paymentPending: $paymentPending
      paymentGatewayId: $paymentGatewayId
      sourceName: $sourceName
    ) {
      draftOrder {
        id
        status
        order {
          id
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                    Shopify admin API customer mutations                    */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_CUSTOMER_UPDATE_MUTATION = /* GraphQL */ `
  mutation updateCustomerMetafields($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        metafields(first: 3) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                     Shopify admin API product mutations                    */
/* -------------------------------------------------------------------------- */

export const SHOPIFY_ADMIN_PRODUCT_UPDATE_MUTATION = /* GraphQL */ `
  mutation productUpdateMutation($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        ...AdminProductFragment
      }
    }
  }

  ${SHOPIFY_ADMIN_PRODUCT_FRAGMENT}
`;
