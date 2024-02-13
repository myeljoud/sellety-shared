---
"sellety-shared": minor
---

This is a minor verison that includes:

- Updated version of the `ShopifyAdminProduct`, named `ShopifyAdminProductV2`.
- A new `DraftOrder` and `DraftOrderLineItem` types that reshapes the Shopify types: `ShopifyAdminDraftOrder` and `ShopifyAdminDraftOrderLineItem`.
- A new reshape function named `reshapeDraftOrder` that reshapes the `draftOrder` payload to a more compatible `DraftOrder` object.
- A new changes to the `SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT`, that matches the new types and reshape function.
