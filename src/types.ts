import type { PartialDeep } from "type-fest";

import { CURRENCY_FORMATS, STORE_MODES, THEME_OPTIONS } from "./constants";
import type {
  Customer,
  Order,
  ProductOption,
  ProductVariant,
  SelectedOption,
  ShopifyAdminMutationDraftOrderCompleteArgs,
  ShopifyCustomer,
  ShopifyCustomerExtraDataShape,
} from "./shopify/types";

export type Maybe<T> = T | null;

export type EnumObject<E extends string, T> = {
  [K in E]: T;
};

export type Locale = "en" | "ar" | "fr";
export type StoreMode = (typeof STORE_MODES)[number];
export type ThemeMode = (typeof THEME_OPTIONS)[number];
export type CurrencyFormat = (typeof CURRENCY_FORMATS)[number];

export type WithStoreMode<T> = EnumObject<StoreMode, T>;

export type ModuleEntity = {
  type: string;
  key: string;
  title: string | null;
  displayType: string | null;
};

export type TextSizes = "xl" | "lg" | "md" | "sm" | "xs";
export type SpinnerSizes = "lg" | "md" | "sm" | "xs";
export type ButtonSizes = "lg" | "md" | "sm";
export type ButtonVariants = "solid" | "outline" | "subtle" | "link";

export type ProductType = {
  imgSrc: string;
  title: string;
  price: number;
  currencyFormat: CurrencyFormat;
  comparePrice: number;
  rating: number;
  ratingBasis: number;
  bestSeller: boolean;
  loved: boolean;
  brand: string;
  seller: string;
};

export type LayoutTypeOptions = "intrinsic" | "fill" | "contain";

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

export type NormalizedProductThumbnailPayload = {
  id: string;
  title: string;
  imgUrl: string;
  vendor: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  isGrocery: boolean;
  bestSeller: boolean;
  numberOfReviews: number;
  averageRating: number;
  brand?: Maybe<string>;
  firstAvailableVariant?: Maybe<ProductVariant>;
};

export type ProductSchemaType = "sanity" | "storefront" | "admin";

export type GraphQLConnection<T> = {
  edges?: { node: T }[];
  nodes?: T[];
};

export type SelectedOptions = Record<string, string>;

export type SelectVariantCallback = (variant: ProductVariant | null) => void;

export type SelectOptionCallback = (
  name: SelectedOption["name"],
  value: SelectedOption["value"]
) => void;

export type SelectOptionsCallback = (options: SelectedOptions) => void;

export type OptionsInStockCallback = (
  name: SelectedOption["name"],
  value: SelectedOption["value"]
) => boolean;

export type OptionWithValues = {
  name: SelectedOption["name"];
  values: SelectedOption["value"][];
};

export type ProductOptionsHookValue = PartialDeep<{
  /** An array of the variant `nodes` from the `VariantConnection`. */
  variants: PartialDeep<ProductVariant>[];
  /** An array of the product's options and values. */
  options: ProductOption[];
  /** The selected variant. */
  selectedVariant?: ProductVariant | null;
  selectedOptions: SelectedOptions;
}> & {
  /** A callback to set the selected variant to the variant passed as an argument. */
  setSelectedVariant: SelectVariantCallback;
  /** A callback to set the selected option. */
  setSelectedOption: SelectOptionCallback;
  /** A callback to set multiple selected options at once. */
  setSelectedOptions: SelectOptionsCallback;
  /** A callback that returns a boolean indicating if the option is in stock. */
  isOptionInStock: OptionsInStockCallback;
};

export type NewReviewFormValues = {
  body: string;
  customerName: string;
};

export type CouponFormValues = {
  code: string;
  serverError?: string;
};

export type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  signMeOut?: boolean;
};

export type PersonalInformationsFormValues = {
  firstName: string;
  phone: string;
  email: string;
  preferredLanguage: "en" | "ar" | "fr";
  preferredCurrencyFormat: "MRU" | "MRO";
};

export type SignInFormValues = {
  emailOrPhone: string;
  password: string;
  serverError?: string;
};

export type SignUpFormValues = {
  firstName: string;
  phone: string;
  password: string;
  acceptsMarketing: boolean;
  email?: string;
  serverError?: string;
};

export type ForgotPasswordFormValues = {
  email: string;
  serverError?: string;
};

export type FastChekoutValues = {
  firstName: string;
  phone: string;
  phoneSameAsWhatsApp?: boolean;
};

export type PreorderNowFormValues = {
  fullname: string;
  phone: string;
  link: string;
  email?: string;
};

export type AddressAddAndEditFormValues = {
  firstName: string;
  phone: string;
  submitError?: string;
};

export type ApiErrorEntity = {
  error: {
    type?: string;
    message: string;
  };
};

export type GetCustomerApiInput = {
  customerAccessToken?: string | null;
  locale?: Locale;
};

export type GetCustomerApiResponse =
  | { customer: ShopifyCustomer; error: null }
  | { customer?: never; error: string };

export type SignInApiInput = {
  email: string;
  password: string;
  locale?: Locale;
};

export type SignInApiResponse =
  | { customer: Customer; error: null }
  | { customer: never; error: string };

export type SignUpApiInput = {
  firstName: string;
  email: string;
  phone: string;
  password: string;
  acceptsMarketing: boolean;
  locale?: Locale;
};

export type SignUpApiResponse = {
  error: string | null;
};

export type CustomerExtraDataApiInput = {
  customerId: string;
  metafieldId?: string | null;
  extraDataInput: ShopifyCustomerExtraDataShape;
};

export type CustomerExtraDataApiResponse = {
  error: string | null;
};

export type CheckoutCompleteApiInput = {
  input: ShopifyAdminMutationDraftOrderCompleteArgs;
};

export type CheckoutCompleteApiResponse =
  | { order: Order; error: null }
  | { order: never; error: string };

export type ChangePasswordApiInput = ChangePasswordFormValues & {
  email?: Maybe<string>;
};

export type ChangePasswordApiResponse = { error: null } | { error: string };

// export type ReviewCreateApiInput = NewReviewFormValues

export type ReviewCreateApiResponse =
  | { productReviews: SanityDocument<any> | null; error: null }
  | { productReviews: never; error: string };

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type LatLngLiteral = {
  lat: number;
  lng: number;
};

export type ErrorStateType = "unknown" | "network" | "server" | "not-found";
