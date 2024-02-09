# sellety-shared

## 0.3.0

### Minor Changes

- 23ad757: Added some new functions and types

  - `getCart` to get a customer cart by id.
  - `createCart` creates a cart session.
  - `addCartLines` add new lines to an existing cart by id.
  - `updateCartLines` updates existing cart lines.
  - `removeCartLines` removes lines from the cart.

## 0.2.6

### Patch Changes

- df11ee4: Added `totalRefunded` to Shopify order.
- 3ee257b: Fixing error in `SHOPIFY_GET_ORDER_QUERY` where the fragment was mentioned with the wrong name.

## 0.2.5

### Patch Changes

- b040ec2: FIX
- 19e7dc6: Fixing some Shopify GraphQL fragment names.
- 82e9b45: New one

## 0.2.4

### Patch Changes

- 3b55721: fixing `getCustomerAddress` function query.

## 0.2.3

### Patch Changes

- 4b567f2: New queries, mutations and methods

  - Added `createCustomerAddress`, to create a customer address.
  - Added `updateCustomerAddress`, to update a customer address.
  - All new methods are correctly typed.
  - Added `locale` as required for customer queries.

## 0.2.2

### Patch Changes

- f63085f: Minor changes:

  - `apiVersion` is now optional with fallback to `SHOPIFY_LATEST_API_VERSION`.
  - Removing `async` from `createShopifyClient` function.

## 0.2.1

### Patch Changes

- f2c2717: Re-exporting new shopify client and LATEST_API_VERSION

## 0.2.0

### Minor Changes

- 3865287: Introducing a new API for Shopify client

## 0.1.24

### Patch Changes

- f3d0c33: Added some new required env variables

## 0.1.23

### Patch Changes

- 71bb15b: Bug fixes & improvments

  - Adding new constants to better connect queries
  - Fixing a bug in `swapSanityProductsWithShopifysInModules` to filter null when a product is not available in Shopify
  - Adding a new key in `ShopifyAdminOrder`, `poNumber` that represents the PO number of the order
  - Fixing some typos in naming.

## 0.1.22

### Patch Changes

- c631918: Simplfying `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION` payload

## 0.1.21

### Patch Changes

- e78f872: patch fix

## 0.1.20

### Patch Changes

- 2f926cc: patch fix

## 0.1.19

### Patch Changes

- 2bb8e7a: Deleting unsed fragment in `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION`

## 0.1.18

### Patch Changes

- 6b24ea7: Fixing `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION`exeeding query limit.

## 0.1.17

### Patch Changes

- 1e76918: Minor changes:

  - Fixing a bug where is a duplicated fragment in `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION`
  - Changing the return type of `/api/checkout/checkout-complete` api.

## 0.1.16

### Patch Changes

- bb28b4d: Added custom Metafields to `ShopifyAdminProduct`

## 0.1.15

### Patch Changes

- d8b5f6a: Fixing some fragments

## 0.1.14

### Patch Changes

- ca58b56: New changes:

  - type for `ShopifyAdminProductVariant`.
  - fixing `reshapeOrder` function, to reshape `reshapeOrderLineItems`.
  - adapting `SHOPIFY_ADMIN_PRODUCT_FRAGMENT` and `SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT` to match storefront couterpart.
  - returning order information from `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION` to match storefront order.

## 0.1.13

### Patch Changes

- 9b445ef: Added some new admin types

## 0.1.12

### Patch Changes

- 6c2fdaf: Bug fixes

  - Deleting duplicated fragment in `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`

## 0.1.11

### Patch Changes

- 5308380: Patch update

  - Adds a missing fragment in `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`.

## 0.1.10

### Patch Changes

- 882cb30: - Fixing a bug in `createCalculatedDraftOrder` mutation.
  - Fix a typo in a shopify fragment

## 0.1.9

### Patch Changes

- 652081a: Fixing a bug in a shopify query

## 0.1.8

### Patch Changes

- f2a6677: Fixing a Shopify type

## 0.1.7

### Patch Changes

- d99e32f: Added types for cart operations

## 0.1.6

### Patch Changes

- a2343f2: tightening up some types

## 0.1.5

### Patch Changes

- 52a90a3: Changing node to edges

## 0.1.4

### Patch Changes

- 5404aaf: Added some new Shopify types

## 0.1.3

### Patch Changes

- 0f33bd5: Reconfiguring exports to expose `shopify` and `sanity` folders.

## 0.1.2

### Patch Changes

- 36b1f78: cleaning tsconfig

## 0.1.1

### Patch Changes

- f6a42d3: added subpaths

## 0.1.0

### Minor Changes

- 6cdcf88: Added apis

## 0.0.2

### Patch Changes

- 5f0e41c: Ignored `vite.config.ts`
