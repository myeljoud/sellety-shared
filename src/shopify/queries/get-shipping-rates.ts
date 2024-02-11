export const SHOPIFY_ADMIN_GET_SHIPPING_RATES_QUERY = /* GraphQL */ `
  query getShippingRates($id: ID) {
    deliveryProfile(id: $id) {
      profileLocationGroups {
        locationGroupZones(first: 1) {
          nodes {
            methodDefinitions(first: 3) {
              nodes {
                active
                description
                id
                name
                rateProvider {
                  ... on DeliveryRateDefinition {
                    id
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
                methodConditions {
                  conditionCriteria {
                    ... on MoneyV2 {
                      amount
                      currencyCode
                    }
                    ... on Weight {
                      unit
                      value
                    }
                  }
                  field
                  id
                  operator
                }
              }
            }
          }
        }
      }
    }
  }
`;
