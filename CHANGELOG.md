# sellety-shared

## 0.6.14

### Patch Changes

- 3f2dcbf: commenting fragment in `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`

## 0.6.13

### Patch Changes

- 79dde87: fix a bug in `SHOPIFY_ADMIN_DRAFT_ORDER_CREATE_MUTATION`

## 0.6.12

### Patch Changes

- 2c5f689: fix a bug in `addressToShopifyAddress` util

## 0.6.11

### Patch Changes

- 03b41c7: Typing the return of `createShopifyClient`

## 0.6.10

### Patch Changes

- ea1bfc7: add new function `renewCustomerAccessToken`

## 0.6.9

### Patch Changes

- f67021a: new types: `ShopifyCustomerAccessTokenRenewPayload`, `ShopifyMutationCustomerAccessTokenRenewArgs` and `ShopifyAdminDraftOrderArgs`. and a query: `SHOPIFY_CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION`

## 0.6.8

### Patch Changes

- cadf2a9: add `TODO` type

## 0.6.7

### Patch Changes

- 2c3a7e2: minor update to `FirestoreUserDocument`

## 0.6.6

### Patch Changes

- 23846b0: update some types

## 0.6.5

### Patch Changes

- 2b1df18: patch

## 0.6.4

### Patch Changes

- e44d772: fix errors

## 0.6.3

### Patch Changes

- 85a5b0c: cleaning sanity queries, fragments and types.

## 0.6.2

### Patch Changes

- 81f74f7: fix a bug in `SanityModularPageV2`

## 0.6.1

### Patch Changes

- dd94a92: Update `SanityModularPageArgs`.
- f19e934: Add new types for new sanity modules.

## 0.6.0

### Minor Changes

- 410d68b: This version includes some minor changes:

  - Fixing some bugs in types like `ProductVariant` & `ShopifyProduct`.
  - Making `featuredImage` key in `draftOrder` optional.
  - Added some new sanity types to reflect `studio` changes: `SanityCollectionV2`, `SanityCategoriesBaseV2`, `SanityCategoriesSimpleV2`, `SanityCategoriesFamiliesV2`, `SanityCategoriesFamily` & `SanityGlobalAppDataV2`.
  - Creating newer version of sanity queries to match changes in the studio schema: `SANITY_VENDOR_BY_ID_QUERY_V2`, `SANITY_GLOBAL_APP_DATA_QUERY_V2` and `SANITY_COLLECTION_QUERY_V2`.
  - Update existing sanity queries to match studio schema changes: `SANITY_MODULAR_PAGE_WITH_IMAGES_QUERY` & `SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT`.

## 0.5.16

### Patch Changes

- c35cc23: added the ability to include `Shopify-Storefront-Buyer-IP` header in `createShopifyClient` function.

## 0.5.15

### Patch Changes

- e14d0ed: New changes

## 0.5.14

### Patch Changes

- 074cacc: change return type of `updateCustomer` method on `createShopifyClient`.
- b7bb6f3: change `.changeset/config.json`

## 0.5.13

### Patch Changes

- 67e2541: patch

## 0.5.12

### Patch Changes

- c487e2f: new func `shopifyLegacyIdFromGid`

## 0.5.11

### Patch Changes

- 198b337: small

## 0.5.10

### Patch Changes

- 4de44de: patch

## 0.5.9

### Patch Changes

- dc9465f: added `Timestamp` type

## 0.5.8

### Patch Changes

- d8febc4: added new types for firebase functions args and payloads
- d1e355b: added two new fields to `FirestoreProductReview`
- fc268d2: added new type `FirestoreProductReviewInput`

## 0.5.7

### Patch Changes

- 47ee1d4: removing `title` key from `FirestoreProductReview`

## 0.5.6

### Patch Changes

- 881bb7c: added new firebase type

## 0.5.5

### Patch Changes

- adf6815: added new types for firebase firestore

## 0.5.4

### Patch Changes

- be3226e: Change `createCustomerAccessToken` return type

## 0.5.3

### Patch Changes

- 51360f2: Exporting `staticMapsUrlCreator` and `StaticMapsUrlCreatorOptions`

## 0.5.2

### Patch Changes

- b34ad99: Added `decodePluscode` util function.

## 0.5.1

### Patch Changes

- e7ed217: Added new `ShippingRate` type.

## 0.5.0

### Minor Changes

- fc258f9: This version includes

  - Added a new firebase export
  - Installed `graphql` and `graphql-request` as dependencies.
  - Added constants from sellety-mobile, check `src/constants.ts`.
  - Added `OpenLocationCode` class for plus codes operations.
  - Added a `staticMapsUrlCreator` function that creates a statis maps client.
  - Added new utils from sellety-mobile, `parseResponseError` & `addressToShopifyAddress`.
  - Added a new Sanity fragment `SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT` for client that needs the image returned not a reference of it.

## 0.4.3

### Patch Changes

- 09dfdd9: Added some common firebase's firestore types

## 0.4.2

### Patch Changes

- 4cbdf80: Fixing a bug in `ShopifyAdminProductV2`

## 0.4.1

### Patch Changes

- 8eb1dbf: Using the new `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT` in draft order mutations

## 0.4.0

### Minor Changes

- e93f24e: This is a minor verison that includes:

  - Updated version of the `ShopifyAdminProduct`, named `ShopifyAdminProductV2`.
  - A new `DraftOrder` and `DraftOrderLineItem` types that reshapes the Shopify types: `ShopifyAdminDraftOrder` and `ShopifyAdminDraftOrderLineItem`.
  - A new reshape function named `reshapeDraftOrder` that reshapes the `draftOrder` payload to a more compatible `DraftOrder` object.
  - A new changes to the `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`, that matches the new types and reshape function.

## 0.3.13

### Patch Changes

- 9e21126: Fixing an error in `SHOPIFY_ADMIN_GET_SHIPPING_RATES_QUERY` where the `id` is marked as optional.

## 0.3.12

### Patch Changes

- 0772d44: New mutation `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_SIMPLE_MUTATION`

## 0.3.11

### Patch Changes

- b6b1c1f: Exporting queries

## 0.3.10

### Patch Changes

- 9e5bdf7: Added new queries and types:

  Queries: - `SHOPIFY_ADMIN_GET_SHIPPING_RATES_QUERY` - `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`
  Types: - `Weight` - `ShopifyAdminDeliveryProfile` - `ShopifyAdminDeliveryMethodDefinition` - `ShopifyAdminDeliveryCondition`

## 0.3.9

### Patch Changes

- 4479129: Updating `getProducts`

## 0.3.8

### Patch Changes

- 2cbac23: adding some new args `getProductRecommendations`

## 0.3.7

### Patch Changes

- f4e11b4: Fixing a small bug in `SHOPIFY_GET_COLLECTION_PRODUCTS_QUERY`.
- 598285c: `getCollectionProducts` returns only products

## 0.3.6

### Patch Changes

- 9d9c97d: Changing `ShopifyCollectionProductsArgs` to make `after` accept `null`.

## 0.3.5

### Patch Changes

- 9ebfb70: Altering `getCollectionProducts` to better fit `web` and `mobile`.

## 0.3.4

### Patch Changes

- d3840e2: `getProduct` method now accepts product `id` or `handle`, correctly typed.

## 0.3.3

### Patch Changes

- 77b5442: Minor changes to cart mutation types, added `locale` as required.

## 0.3.2

### Patch Changes

- 4d6d834: Bug fix: Fixing the return type of `createCustomerAddress`

## 0.3.1

### Patch Changes

- 59bf9b0: Adding the correct return type for: `updateCartLines` & `removeCartLines`.
- 7ca907c: `SHOPIFY_CART_CREATE_MUTATION` input is not required

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
