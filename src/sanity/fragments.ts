export const SANITY_COLLECTION_FIELDS_FRAGMENT = /* groq */ `
  _type,
  _createdAt,
  _updatedAt,
  title,
  collectionType,
  storeType,
  isVendorCertified,
  "shopifyId": store.gid,
  "titleOg": store.title,
  "slug": store.slug.current,
  "imageUrl": store.imageUrl,
  "isDeleted": store.isDeleted,
`;

export const SANITY_CATEGORIES_FRAGMENT = /* groq */ `
  (_type == "categories") => {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    categories[]->{
      _key,
      ${SANITY_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "categories.groups") => {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    groups[] {
      _type,
      _key,
      title,
      categories[]->{
        _key,
        ${SANITY_COLLECTION_FIELDS_FRAGMENT}
      }
    }
  }
`;

export const SANITY_ASSET_FIELDS_FRAGMENT = /* groq */ `
  _id,
  _type,
  url,
  extension,
  mimeType,
  _createdAt,
  _updatedAt,
  "lqip": metadata.lqip,
  "blurHash": metadata.blurHash,
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
  "aspectRatio": metadata.dimensions.aspectRatio,
`;

export const SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT = /* groq */ `
  _type,
  alt,
  hasCollection,
  collection->{
    ${SANITY_COLLECTION_FIELDS_FRAGMENT}
  },
  image{
    _type,
    asset->{
      ${SANITY_ASSET_FIELDS_FRAGMENT}
    }
  }
`;

export const SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT = /* groq */ `
  (_type == "module.hero") => {
    title,
    description,
    image {
      ${SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "module.carousel") => {
    images[] {
      _key,
      ${SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "module.brands") => {
    title,
    brands[] {
      _key,
      ${SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "module.categories") => {
    title,
    collections[]->{
      _key,
      ${SANITY_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "module.collections") => {
    title,
    collections[] {
      _key,
      ${SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "module.products") => {
    title,
    products[]->{
      "shopifyId": store.gid,
      "isDeleted": store.isDeleted,
      "imageUrl": store.previewImageUrl,
      "slug": store.slug.current,
      "title": store.title,
    }
  }
`;
