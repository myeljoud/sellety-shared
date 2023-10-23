import {
  SHOPIFY_ADDRESS_FRAGMENT,
  SHOPIFY_ADMIN_CALCULATED_DRAFT_ORDER_FRAGMENT,
  SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT,
  SHOPIFY_ADMIN_PRODUCT_FRAGMENT,
  SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT,
  SHOPIFY_MONEY_BAG_FRAGMENT,
} from "../fragments";

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
          cancelledAt
          email
          displayFinancialStatus
          displayFulfillmentStatus
          lineItems(first: 20) {
            edges {
              node {
                currentQuantity
                originalTotalSet {
                  ...MoneyBagFragment
                }
                quantity
                title
                variant {
                  ...AdminProductVariantFragment
                }
                product {
                  ...AdminProductFragment
                }
              }
            }
          }
          name
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

  ${SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_FRAGMENT}
  ${SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT}
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
