import {
  SANITY_ALL_MODULES_FRAGMENT,
  SANITY_CATEGORIES_FRAGMENT,
  SANITY_SITE_METADATA_FRAGMENT,
} from "./fragments";

/**
 * @param productId - The shopify gid for the product.
 */
export const SANITY_PRODUCT_REVIEWS_BY_ID_QUERY = `
  *[_type == "productReviews" && reviewedProduct._ref == $productId][0] {
    "product": reviewedProduct->.store,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
    "type": _type,
    reviews
  }
`;

/**
 * @param collectionId - The shopify gid for the collection.
 */
export const SANITY_VENDOR_BY_ID_QUERY = `
  *[_type == "collection" && store.gid == $collectionId][0] {
    "shopifyID": store.gid,
    collectionType,
    isVendorCertified,
    modules,
    selletyOrGrocery,
    "title": store.title,
    "slug": store.slug.current,
    "imageUrl": store.imageUrl,
    "isDeleted": store.isDeleted,
  }
`;

/**
 * @param type - The type of the document, usually `home | preorder`
 * @param id - The id of sanity document, usually `sellety | grocery | preorderPage`
 */
export const SANITY_MODULAR_PAGE_QUERY = `
  *[_type == $type && _id == $id][0] {
    "slug": slug.current,
    title,
    modules[] {
      ${SANITY_ALL_MODULES_FRAGMENT}
    }
  }
`;

export const SANITY_GLOBAL_APP_DATA_QUERY = `
  {
    "categories": {
      "sellety": *[_id == "selletyCategories"][0] {
        ${SANITY_CATEGORIES_FRAGMENT}
      },
      "grocery": *[_id == "groceryCategories"][0] {
        ${SANITY_CATEGORIES_FRAGMENT}
      }
    },
    "site": {
      ${SANITY_SITE_METADATA_FRAGMENT}
    }
  }
`;

export const SANITY_PAGINATION_DATA_QUERY = `
  {
    "paginationLimit": *[_type == "shopSettings"][0].paginationLimit,
    "emptyFilterResults": {
      "heading": *[_type == "shopSettings"][0].noFilterResults[@.style == "h2"][0].children[0].text,
      "body": *[_type == "shopSettings"][0].noFilterResults[@.style == "normal"][0].children[0].text
    }
  }
`;

/**
 * @param slug - The shopify slug for the collection
 */
export const SANITY_COLLECTION_QUERY = `
  *[_type == "collection" && store.slug.current == $slug][0] {
    "shopifyId": store.gid,
    collectionType,
    modules[] {
      ${SANITY_ALL_MODULES_FRAGMENT}
    },
    selletyOrGrocery,
    "title": {
      "en": store.title,
      "fr": titleTranslations.fr,
      "ar": titleTranslations.ar
    },
    "slug": store.slug.current,
    "imageUrl": store.imageUrl,
    "isDeleted": store.isDeleted,
  }
`;
