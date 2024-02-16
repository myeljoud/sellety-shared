export const SANITY_COLLECTION_FRAGMENT = `
  ...,
  "title": {
    "en": store.title,
    "fr": titleTranslations.fr,
    "ar": titleTranslations.ar
  }
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

const COLLECTION_FRAGMENT = /* groq */ `
  ...,
  "title": {
    "en": store.title,
    "fr": titleTranslations.fr,
    "ar": titleTranslations.ar
  }
`;

const ASSET_FRAGMENT = /* groq */ `
  url,
  size,
  extension,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  "id": _id,
  metadata {
    blurHash,
    "aspectRatio": dimensions.aspectRatio,
    "height": dimensions.height,
    "width": dimensions.width,
    lqip,
  }
`;

const BRANDS_GRID = /* groq */ `
  brandsImages[] {
    ...,
    collection-> {
      ${COLLECTION_FRAGMENT}
    },
    image{
      "type": _type,
      asset->{
        ${ASSET_FRAGMENT}
      }
    }
  }
`;

const CATEGORIES_GRID = /* groq */ `
  ...,
  collectionList[]->{
    ${COLLECTION_FRAGMENT}
  }
`;

const COLLECTIONS_GRID = /* groq */ `
  collectionsImages[] {
    ...,
    collection->{
      ${COLLECTION_FRAGMENT}
    },
    image{
      "type": _type,
      asset->{
        ${ASSET_FRAGMENT}
      }
    }
  }
`;

const HERO_GRID = /* groq */ `
  "heroCarouselImages": [
    ...heroSecondaryImages[] {
      ...,
      collection->{
        ${COLLECTION_FRAGMENT}
      },
      image{
        "type": _type,
        asset->{
          ${ASSET_FRAGMENT}
        }
      }
    },
    ...heroCarouselImages[] {
      ...,
      collection->{
        ${COLLECTION_FRAGMENT}
      },
      image{
        "type": _type,
        asset->{
          ${ASSET_FRAGMENT}
        }
      }
    }
  ],
`;

const HERO_WITH_CONTENT = /* groq */ `
  description,
  heading,
  heroMainImage{
    ...,
    collection->{
      ${COLLECTION_FRAGMENT}
    },
    image{
      "type": _type,
      asset->{
        ${ASSET_FRAGMENT}
      }
    }
  }
`;

const INFORMATIONALS = /* groq */ `
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

const PRODUCTS_LIST = /* groq */ `
  products[]-> {
    "shopifyId": store.gid
  }
`;

const SIMPLE_HERO_SECTION = /* groq */ `
  heroCarouselImages[] {
    ...,
    collection->{
      ${COLLECTION_FRAGMENT}
    },
    image{
      "type": _type,
      asset->{
        ${ASSET_FRAGMENT}
      }
    }
  }
`;

export const SANITY_ALL_MODULES_WITH_IMAGES_FRAGMENT = /* groq */ `
  "key": _key,
  "type": _type,
  title,
  displayType,
  (_type == "heroGrid") => {
    ${HERO_GRID}
  },
  (_type == "heroWithContent") => {
    ${HERO_WITH_CONTENT}
  },
  (_type == "simpleHeroSection") => {
    ${SIMPLE_HERO_SECTION}
  },
  (_type == "brandsGrid") => {
    ${BRANDS_GRID}
  },
  (_type == "categoriesGrid") => {
    ${CATEGORIES_GRID}
  },
  (_type == "collectionsGrid") => {
    ${COLLECTIONS_GRID}
  },
  (_type == "productsList") => {
    ${PRODUCTS_LIST}
  },
  (_type == "informationals") => {
    ${INFORMATIONALS}
  }
`;
