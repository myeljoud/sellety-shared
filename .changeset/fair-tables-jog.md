---
"sellety-shared": minor
---

This version includes some minor changes:

- Fixing some bugs in types like `ProductVariant` & `ShopifyProduct`.
- Making `featuredImage` key in `draftOrder` optional.
- Added some new sanity types to reflect `studio` changes: `SanityCollectionV2`, `SanityCategoriesBaseV2`, `SanityCategoriesSimpleV2`, `SanityCategoriesFamiliesV2`, `SanityCategoriesFamily` & `SanityGlobalAppDataV2`.
- Creating newer version of sanity queries to match changes in the studio schema: `SANITY_VENDOR_BY_ID_QUERY_V2`, `SANITY_GLOBAL_APP_DATA_QUERY_V2` and `SANITY_COLLECTION_QUERY_V2`.
- Update existing sanity queries to match studio schema changes: `SANITY_MODULAR_PAGE_WITH_IMAGES_QUERY` & `SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT`.
