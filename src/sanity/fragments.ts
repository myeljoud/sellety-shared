export const SANITY_COLLECTION_FRAGMENT = `
  ...,
  "title": {
    "en": store.title,
    "fr": titleTranslations.fr,
    "ar": titleTranslations.ar
  }
`;

export const SANITY_COLLECTION_FIELDS_FRAGMENT = /* groq */ `
  _type,
  title,
  collectionType,
  storeType,
  isVendorCertified,
  "shopifyId": store.gid,
  "titleOg": store.title,
  "slug": store.slug.current,
  "imageUrl": store.imageUrl,
  "isDeleted": store.isDeleted,
  _createdAt,
  _updatedAt,
`;

export const SANITY_EMPTY_COLLECTION_FRAGMENT = `
  "emptyFilterResults": {
    "heading": *[_type == "shopSettings"][0].noFilterResults[@.style == "h2"][0].children[0].text,
    "body": *[_type == "shopSettings"][0].noFilterResults[@.style == "normal"][0].children[0].text
  }
`;

export const SANITY_PAGINATION_LIMIT_FRAGMENT = `
  "paginationLimit": *[_type == "shopSettings"][0].paginationLimit
`;

export const SANITY_CATEGORIES_LIST_FRAGMENT = `
  categoriesList[]->{
    "id": _id,
    selletyOrGrocery,
    "title": {
      "en": store.title,
      "fr": titleTranslations.fr,
      "ar": titleTranslations.ar
    },
    "imageUrl": store.imageUrl,
    "slug": store.slug.current,
    "shopifyID": store.gid
  }
`;

export const SANITY_CATEGORIES_FRAGMENT = `
  (_type == "categories") => {
    "id": _id,
    "type": _type,
    ${SANITY_CATEGORIES_LIST_FRAGMENT}
  },
  (_type == "categoriesFamilies") => {
    "id": _id,
    "type": _type,
    categoriesFamiliesList[] {
      title,
      ${SANITY_CATEGORIES_LIST_FRAGMENT}
    }
  }
`;

export const SANITY_CATEGORIES_FRAGMENT_V2 = /* groq */ `
  (_type == "categories") => {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    categoriesList[]->{
      ${SANITY_COLLECTION_FIELDS_FRAGMENT}
    }
  },
  (_type == "categoriesFamilies") => {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    categoriesFamiliesList[] {
      _type,
      _key,
      title,
      categoriesList[]->{
        ${SANITY_COLLECTION_FIELDS_FRAGMENT}
      }
    }
  }
`;

export const SANITY_SITE_METADATA_FRAGMENT = `
  "title": *[_type == "generalSettings"][0].siteTitle,
  "rootDomain": *[_type == "generalSettings"][0].siteURL,
  "shop": *[_type == "shopSettings"][0] {
    storeURL,
    cartMessage
  },
  "cookieConsent": *[_type == "cookieSettings"][0] {
    enabled,
    message,
    "link": link->{
      "type": _type,
      "slug": slug.current
    }
  },
  "seo": *[_type == "seoSettings"][0] {
    metaTitle,
    metaDesc,
    shareTitle,
    shareDesc,
    shareGraphic,
    "favicon": favicon.asset->url,
    "faviconLegacy": faviconLegacy.asset->url,
    touchIcon
  },
  "gtmID": *[_type == "generalSettings"][0].gtmID,
`;

export const SANITY_BRANDS_GRID_MODULE_FRAGMENT = `
  brandsImages[] {
    ...,
    collection->{
      ${SANITY_COLLECTION_FRAGMENT}
    },
  }
`;

export const SANITY_CATEGORIES_GRID_MODULE_FRAGMENT = `
  collectionList[]->{
    ${SANITY_COLLECTION_FRAGMENT}
  }
`;

export const SANITY_COLLECTIONS_GRID_MODULE_FRAGMENT = `
  collectionsImages[] {
    ...,
    collection->{
      ${SANITY_COLLECTION_FRAGMENT}
    },
  }
`;

export const SANITY_HERO_GRID_MODULE_FRAGMENT = `
  heroSecondaryImages[] {
    ...,
    collection->{
      ${SANITY_COLLECTION_FRAGMENT}
    },
  },
  heroCarouselImages[] {
    ...,
    collection->{
      ${SANITY_COLLECTION_FRAGMENT}
    },
  }
`;

export const SANITY_HERO_WITH_CONTENT_MODULE_FRAGMENT = `
  ...,
  link[0] {
    ...,
    reference != null => reference->,
  }
`;

export const SANITY_INFORMATIONALS_MODULE_FRAGMENT = `
  informationalsList[] {
    ...,
    link[0] {
      ...,
      reference != null => {
        ...,
        reference->
      },
    }
  }
`;

export const SANITY_PRODUCTS_LIST_MODULE_FRAGMENT = `
  products[]-> {
    "shopifyId": store.gid
  }
`;

export const SANITY_SIMPLE_HERO_SECTION_MODULE_FRAGMENT = `
  heroCarouselImages[] {
    ...,
    collection->{
      ${SANITY_COLLECTION_FRAGMENT}
    },
  }
`;

export const SANITY_ALL_MODULES_FRAGMENT = `
  "key": _key,
  "type": _type,
  title,
  displayType,
  (_type == "heroGrid") => {
    ${SANITY_HERO_GRID_MODULE_FRAGMENT}
  },
  (_type == "heroWithContent") => {
    ${SANITY_HERO_WITH_CONTENT_MODULE_FRAGMENT}
  },
  (_type == "simpleHeroSection") => {
    ${SANITY_SIMPLE_HERO_SECTION_MODULE_FRAGMENT}
  },
  (_type == "brandsGrid") => {
    ${SANITY_BRANDS_GRID_MODULE_FRAGMENT}
  },
  (_type == "categoriesGrid") => {
    ${SANITY_CATEGORIES_GRID_MODULE_FRAGMENT}
  },
  (_type == "collectionsGrid") => {
    ${SANITY_COLLECTIONS_GRID_MODULE_FRAGMENT}
  },
  (_type == "productsList") => {
    ${SANITY_PRODUCTS_LIST_MODULE_FRAGMENT}
  },
  (_type == "informationals") => {
    ${SANITY_INFORMATIONALS_MODULE_FRAGMENT}
  }
`;

const SANITY_ASSET_FIELDS_FRAGMENT = /* groq */ `
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

const SANITY_IMAGE_LINKED_COLLECTION_FIELDS_FRAGMENT = /* groq */ `
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
