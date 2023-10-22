---
"sellety-shared": patch
---

New changes:

- type for `ShopifyAdminProductVariant`.
- fixing `reshapeOrder` function, to reshape `reshapeOrderLineItems`.
- adapting `SHOPIFY_ADMIN_PRODUCT_FRAGMENT` and `SHOPIFY_ADMIN_PRODUCT_VARIANT_FRAGMENT` to match storefront couterpart.
- returning order information from `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION` to match storefront order.
