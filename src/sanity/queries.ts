import {
  SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT,
  SANITY_CATEGORIES_FRAGMENT,
  SANITY_COLLECTION_FIELDS_FRAGMENT,
} from "./fragments";

/**
 * @param type - The type of the document, usually `home | preorder`
 * @param id - The id of sanity document, usually `home-sellety | home-grocery`
 */
export const SANITY_MODULAR_PAGE_WITH_IMAGES_QUERY = /* groq */ `
  *[_type == $type && _id == $id][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    modules[] {
      _key,
      _type,
      ${SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT}
    }
  }
`;

export const SANITY_GLOBAL_APP_DATA_QUERY = /* groq */ `
  {
    "categories": {
      "sellety": *[_id == "sellety-categories"][0] {
        ${SANITY_CATEGORIES_FRAGMENT}
      },
      "grocery": *[_id == "grocery-categories"][0] {
        ${SANITY_CATEGORIES_FRAGMENT}
      }
    },
    "site": {}
  }
`;

/**
 * @param gid - The shopify gid for the collection
 */
export const SANITY_COLLECTION_BY_GID_QUERY = /* groq */ `
  *[_type == "collection" && store.gid == $gid][0] {
    ${SANITY_COLLECTION_FIELDS_FRAGMENT}
  }
`;

/**
 * @param gid - The shopify gid for the collection.
 */
export const SANITY_VENDOR_BY_GID_QUERY = /* groq */ `
  *[_type == "collection" && store.gid == $gid && collectionType == "VENDOR"][0] {
    ${SANITY_COLLECTION_FIELDS_FRAGMENT}
  }
`;
