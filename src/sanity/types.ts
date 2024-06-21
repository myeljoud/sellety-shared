import type { Product } from "../shopify/types";

export type Maybe<T> = T | null;

export type SanityCollectionType = "COLLECTION" | "VENDOR" | "CATEGORY";
export type SanityStoreType = "sellety" | "grocery";

export type SanityInternationalizedBase = {
  _key: "ar" | "fr" | "en";
  value?: string;
};

export type SanityInternationalizedString = {
  _type: "internationalizedArrayStringValue";
} & SanityInternationalizedBase;

export type SanityInternationalizedText = {
  _type: "internationalizedArrayTextValue";
} & SanityInternationalizedBase;

export type SanityInternationalizedDescription = {
  _type: "internationalizedArrayDescriptionValue";
} & SanityInternationalizedBase;

export declare type SanityDocument<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  [P in keyof T]: T[P];
} & {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SanityCollection = {
  _type: "collection";
  storeType?: SanityStoreType;
  collectionType?: SanityCollectionType;
  isVendorCertified?: boolean;
  shopifyId: string;
  titleOg: string;
  slug: string;
  isDeleted: boolean;
  imageUrl?: string;
  title?: SanityInternationalizedString[];
  /** Date format: `2024-02-22T05:42:45Z` */
  _createdAt: string;
  /** Date format: `2024-02-22T05:42:45Z` */
  _updatedAt: string;
};

export type SanityCategory = SanityCollection;

export type SanityCategories = {
  _id: string;
  _type: "categories";
  _createdAt: string;
  _updatedAt: string;
  categories: SanityCategory[];
};

export type SanityCategoriesGroup = {
  _key: string;
  _type: "categories.group";
  title: SanityInternationalizedString[];
  categories: SanityCategory[];
};

export type SanityCategoriesGroups = {
  _id: string;
  _type: "categories.groups";
  _createdAt: string;
  _updatedAt: string;
  groups: SanityCategoriesGroup[];
};

export type SanityImage = {
  _type: "image";
  asset: {
    _id: string;
    _type: "sanity.imageAsset";
    _createdAt: string;
    _updatedAt: string;
    url: string;
    extension: string;
    mimeType: string;
    lqip: string;
    blurHash: string;
    width: number;
    height: number;
    aspectRatio: number;
  };
};

export type SanityImageLinkedCollection = {
  _type: string;
  alt: SanityInternationalizedString[];
  image: SanityImage;
} & (
  | { hasCollection?: false; collection?: null }
  | { hasCollection: true; collection: SanityCollection }
);

export type SanityModuleBase = {
  _key: string;
};

export type SanityHeroModule = SanityModuleBase & {
  _type: "module.hero";
  title: SanityInternationalizedString[];
  description?: SanityInternationalizedDescription[];
  image: SanityImageLinkedCollection;
};

export type SanityCarouselModule = SanityModuleBase & {
  _type: "module.carousel";
  images: ({ _key: string } & SanityImageLinkedCollection)[];
};

export type SanityBrandsModule = SanityModuleBase & {
  _type: "module.brands";
  title: SanityInternationalizedString[];
  brands: ({ _key: string } & SanityImageLinkedCollection)[];
};

export type SanityCategoriesModule = SanityModuleBase & {
  _type: "module.categories";
  title: SanityInternationalizedString[];
  collections: ({ _key: string } & SanityCollection)[];
};

export type SanityCollectionsModule = SanityModuleBase & {
  _type: "module.collections";
  title: SanityInternationalizedString[];
  collections: ({ _key: string } & SanityImageLinkedCollection)[];
};

export type SanityProductsModule = SanityModuleBase & {
  _type: "module.products";
  title: SanityInternationalizedString[];
  products: {
    shopifyId: string;
    isDeleted: boolean;
    imageUrl: string;
    slug: string;
    title: string;
  }[];
};

export type SanityAndShopifyProductsModule = Omit<
  SanityProductsModule,
  "products"
> & {
  products: Product[];
};

export type SanityModuleV2 =
  | SanityHeroModule
  | SanityCarouselModule
  | SanityBrandsModule
  | SanityCategoriesModule
  | SanityCollectionsModule
  | SanityAndShopifyProductsModule;

export type SanityGlobalAppData = {
  site: null;
  categories: {
    sellety: SanityCategories;
    grocery: SanityCategories;
  };
};

export type SanityModularPage = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  title: SanityInternationalizedString[];
  modules: Maybe<SanityModuleV2[]>;
};

export type SanityDefaultPageWithCollectionArgs = {
  slug: string;
};

export type SanityModularPageArgs = {
  type: "home";
  id: "home-sellety" | "home-grocery";
};

export type SanityCollectionArgs = {
  slug: string;
};
