const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || "http://localhost:3000";

export const WEBSITE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.sellety.com";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Sellety";

export const SUPPORT_MAIL_ADDRESS =
  process.env.NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS || "support@sellety.com";

// This is the URL from which all Sellety Links and their assets are served.
// Use website URL to make links shorter(sellety.com and not app.cal.com)
// As website isn't setup for preview environments, use the webapp url instead
export const SELLETY_URL = new URL(WEBAPP_URL).hostname.endsWith(".vercel.app")
  ? WEBAPP_URL
  : WEBSITE_URL;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const SEO_IMG_DEFAULT = `${WEBSITE_URL}/og-image.png`;
// The Dynamic OG Image is passed through Next's Image API to further optimize it.
// This results in a 80% smaller image 🤯. It is however important that for the query
// parameters you pass to the /api/social/og/image endpoint, you wrap them in encodeURIComponent
// as well, otherwise the URL won't be valid.
// export const SEO_IMG_OGIMG = `${CAL_URL}/_next/image?w=1200&q=100&url=${encodeURIComponent(
//   "/api/social/og/image"
// )}`;

export const WEB_BREAKPOINTS = {
  TABLET_BREAKPOINT: 640,
  LAPTOP_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1264,
};

export const SELLETY_GOODS = "Sellety Goods";
export const SANITY_COLLECTION = "COLLECTION";
export const SANITY_CATEGORY = "CATEGORY";
export const SANITY_VENDOR = "VENDOR";

export const PAGINATION_LIMIT = 12;

export const NOUAKCHOTT = "Nouakchott";
export const MAURITANIA = "Mauritania";
export const MAURITANIA_CODE = "MR";
export const MR_PHONE_CODE = "+222";

export const SHOPIFY_SELLETY_PRODUCT_TAG = "isSellety";
export const SHOPIFY_GROCERY_PRODUCT_TAG = "isGrocery";
export const SHOPIFY_BEST_SELLER_TAG = "best-seller";

export const CHECKOUT_SWR_KEY = "/api/checkout";
export const REVIEWS_SWR_KEY = "/api/product/reviews";

export const SHOPIFY_CART_ID_COOKIE = "shopify_cartId";
export const SHOPIFY_CHECKOUT_ID_COOKIE = "shopify_checkoutId";
export const SHOPIFY_CHECKOUT_URL_COOKIE = "shopify_checkoutUrl";
export const SHOPIFY_CUSTOMER_TOKEN_COOKIE = "shopify_customerToken";
export const SHOPIFY_COOKIE_EXPIRE = 60 * 60 * 24 * 30;
export const RECENTLY_SEARCHED_KEY = "RECENTLY_SEARCHED";

export const SHOPIFY_CART_METAFIELD_NAMESPACE = "global";
export const SHOPIFY_CART_METAFIELD_KEY = "cart_informations";

export const SHOPIFY_CUSTOMER_EXTRA_DATA_MF_NAMESPACE = "custom";
export const SHOPIFY_CUSTOMER_EXTRA_DATA_MF_KEY = "customer_extra_data";

export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-10/graphql.json";

export const SANITY_API_VERSION = "2023-01-01";

export const IS_CHECKOUT_DISABLED =
  process.env.NEXT_PUBLIC_IS_CHECKOUT_DISABLED === "true";

export const MAP_DEFAULT_CENTER = {
  lng: -15.979099,
  lat: 18.089307,
};

export const NOUAKCHOTT_BOUNDS = {
  north: 18.1667,
  south: 17.9595,
  west: -16.026,
  east: -15.8794,
};

export const LANGUAGES = {
  ar: "العربية",
  fr: "Français",
  en: "English",
} as const;

export const REQUIRED_ENV_VARIABLES = [
  "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  "SHOPIFY_ADMIN_ACCESS_TOKEN",
  "SHOPIFY_STORE_DOMAIN",
  "SHOPIFY_WEBHOOK_INTEGRITY",

  "SANITY_PROJECT_DATASET",
  "SANITY_PROJECT_ID",
  "SANITY_API_TOKEN",
  "SANITY_WEBHOOK_SECRET",
  "SANITY_READ_TOKEN",

  "NEXT_PUBLIC_GOOGLE_MAP_STATIC_KEY",
  "NEXT_PUBLIC_GOOGLE_MAP_API_KEY",
] as const;

export const UNAVAILABLE_SANITY_MODULES = ["informationals"];

export const STORE_MODES = ["sellety", "grocery"] as const;
export const CURRENCY_FORMATS = ["MRU", "MRO"] as const;
export const THEME_OPTIONS = ["light", "dark", "system"] as const;
