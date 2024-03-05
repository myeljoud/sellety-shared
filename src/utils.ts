import type { CurrencyFormat, ErrorStateType } from "./types";

import { GraphQLError } from "graphql";
import { REQUIRED_ENV_VARIABLES } from "./constants";
import { FirestoreUserAddress } from "./firebase";
import { ShopifyMailingAddressInput } from "./shopify";
import { OpenLocationCode } from "./openlocationcode";

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const missingEnvironmentVariables = [] as string[];

  REQUIRED_ENV_VARIABLES.forEach(envVar => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }
};

/**
 * see if an object is found in another array of objects
 */
export function hasObject<T extends Record<string, string>>(
  recs: T[] | null,
  vals: T
) {
  if (!recs) return false;

  return recs.some(obj => {
    for (const x in obj) if (x in vals && obj[x] !== vals[x]) return false;
    return true;
  });
}

export function wrap(index: number, length: number) {
  if (index < 0) {
    // eslint-disable-next-line no-param-reassign
    index = length + (index % length);
  }

  if (index >= length) {
    return index % length;
  }

  return index;
}

export function getMaxLogoWidth(w: number, h: number, area: number) {
  return Math.round(w * Math.sqrt(area / (w * h)));
}

/**
 * keep number counters within a range
 */
export function clampRange(value: number, min = 0, max = 1) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

/**
 * A function that stops execution for a given period (in ms)
 **/
export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function numberToCurrency(number: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(number);
}

export function calculateRatingAverage({
  newRating,
  averageRating,
  numberOfReviews,
}: {
  newRating: number;
  averageRating: number;
  numberOfReviews: number;
}) {
  if (
    typeof newRating !== "number" ||
    typeof averageRating !== "number" ||
    typeof numberOfReviews !== "number"
  )
    return 0;

  const average =
    (averageRating * numberOfReviews + newRating) / (numberOfReviews + 1);

  return Math.round(average * 10) / 10;
}

export function getSwrProductReviewKe(productId: string) {
  return `/api/product/reviews?productId=${productId}`;
}

export function createArrayOfInt(length = 5) {
  if (typeof length !== "number" || !Number.isInteger(length)) {
    throw new Error("Length must be an integer");
  }

  const arr = [];

  for (let i = 1; i < length + 1; i++) {
    arr.push(i);
  }

  return arr;
}

export const formatInternationalPhoneToLocal = (phone: string) => {
  // TODO : Handle a RTL bug where the string gets inverted
  if (!phone || typeof phone !== "string") return "";

  const phoneWithoutCountryCode = phone.split("+222")[1];

  if (!phoneWithoutCountryCode) return "";

  return phoneWithoutCountryCode.replace(/(?<temp1>\d{2}(?!\s))/g, "$1 ");
};

export const getDir = (locale: string) => (locale === "ar" ? "rtl" : "ltr");

/**
 * TODO : Add the correct typing for TFunction
 * This needs some revision
 */

export const getCurrenyMultiplier = (format: CurrencyFormat) => {
  switch (format) {
    case "MRU":
      return 1;
    case "MRO":
      return 10;
    default:
      return 1;
  }
};

export const getSelletyEmailFromPhone = (phone: string) => {
  if (!phone) {
    throw new Error("Phone is required");
  }

  const phoneAsArray = phone.split("");
  const firstPart = phoneAsArray.slice(0, 4).join("");
  const secondPart = phoneAsArray.slice(4).join("");

  const email = `${`${firstPart}--${secondPart}`}@sellety.com`;
  return email;
};

export const parsePhoneFromRandomEmail = (email: string) => {
  if (!email) {
    throw new Error("email is required");
  }

  const phone = email.split("@")[0]?.split("--").join("");
  return phone;
};

export const isSelletyRandomEmail = (email?: string | null) => {
  if (!email) {
    throw new Error("email is required");
  }

  return email.includes("--") && email.endsWith("@sellety.com");
};

export const phoneWithoutCode = (phone: string) => {
  return phone.replace("+222", "");
};

export const parseCookie = (cookies: string) => {
  return cookies.split(";").reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.split("=");
    key && value && (acc[key.trim()] = value);
    return acc;
  }, {});
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const divideArrayIntoTwo = <T>(array: T[], n: number): [T[], T[]] => {
  return [array.slice(0, n), array.slice(n)];
};

export const chunkArray = <T>(array: T[], n = 2): T[][] => {
  const [first, second] = divideArrayIntoTwo(array, n);
  if (second.length) {
    return [first, ...chunkArray(second, n)];
  }
  return [first];
};

export const objectToArray = (obj: Record<string, string>) => {
  return Object.keys(obj).map(key => ({ label: obj[key], value: key }));
};

export const getFadedOpacity = (index: number) => {
  return (1 / index) * 1.5;
};

export const parseResponseError = (error: any): ErrorStateType => {
  if (error instanceof GraphQLError) {
    return "server";
  }

  if (
    (error instanceof Error && error.message === "Network request failed") ||
    error?.isNetworkError
  ) {
    return "network";
  }

  return "unknown";
};

export const addressToShopifyAddress = (
  firestoreAddress: FirestoreUserAddress
): ShopifyMailingAddressInput => {
  return {
    address1: firestoreAddress?.address1,
    address2: firestoreAddress?.address2,
    city: firestoreAddress?.city,
    company: firestoreAddress?.country,
    firstName: firestoreAddress?.displayName,
    phone: firestoreAddress?.phone,
  };
};

export function decodePluscode(plusCode: string) {
  if (!OpenLocationCode.isValid(plusCode)) {
    return null;
  }

  const { latitudeCenter, longitudeCenter } = OpenLocationCode.decode(plusCode);

  return {
    latitude: latitudeCenter,
    longitude: longitudeCenter,
  };
}

export function isValidRating(rating: number) {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
}
