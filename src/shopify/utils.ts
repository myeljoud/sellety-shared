import { GraphQLClient } from "graphql-request";
import type { PartialDeep } from "type-fest";

import {
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  SHOPIFY_GROCERY_PRODUCT_TAG,
  SHOPIFY_SELLETY_PRODUCT_TAG,
} from "../constants";
import type { GraphQLConnection, Locale, StoreMode } from "../types";
import { ensureStartsWith } from "../utils";
import type {
  Cart,
  CartLine,
  Collection,
  Connection,
  Customer,
  DraftOrderLineItemInput,
  Image,
  Order,
  OrderLineItem,
  OrderStatus,
  Product,
  ProductOption,
  ShopifyCart,
  ShopifyCollection,
  ShopifyCustomer,
  ShopifyCustomerExtraDataShape,
  ShopifyLocales,
  ShopifyOrder,
  ShopifyOrderLineItem,
  ShopifyProduct,
} from "./types";
import { ShopifyOrderFulfillmentStatus } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const adminEndpoint = `${domain}/admin${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const adminKey = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "";

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: { "X-Shopify-Storefront-Access-Token": key },
});

export const shopifyAdminClient = new GraphQLClient(adminEndpoint, {
  headers: { "X-Shopify-Access-Token": adminKey },
});

export const removeEdgesAndNodes = <T = unknown>(array: Connection<T>) => {
  return array.edges.map(edge => edge.node);
};

export const reshapeCustomer = (customer: ShopifyCustomer): Customer => {
  const { addresses, orders, extraData, ...rest } = customer;

  let _extraData: ShopifyCustomerExtraDataShape | null = null;

  if (extraData?.value) {
    const parsedExtaData = JSON.parse(
      extraData.value
    ) as ShopifyCustomerExtraDataShape;

    _extraData = parsedExtaData;
  }

  return {
    ...rest,
    addresses: removeEdgesAndNodes(addresses),
    orders: reshapeOrders(removeEdgesAndNodes(orders)),
    extraData: _extraData,
    extraDataMetafieldId: extraData?.id ?? null,
  };
};

export const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "MRU",
    };
  }

  const { lines, ...rest } = cart;

  return {
    ...rest,
    lines: removeEdgesAndNodes(lines).map(line => ({
      ...line,
      merchandise: {
        ...line.merchandise,
        product: reshapeProduct(line.merchandise.product),
      },
    })),
  };
};

export const reshapeCollection = (
  collection: ShopifyCollection
): Collection => {
  return {
    ...collection,
    path: `/collection/${collection.handle}`,
  };
};

export const reshapeCollections = (
  collections: ShopifyCollection[]
): Collection[] => {
  const reshapedCollections = [];

  for (const collection of collections) {
    const reshapedCollection = reshapeCollection(collection);
    reshapedCollections.push(reshapedCollection);
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map(image => {
    const filename = /.*\/(?:.*)\..*/.exec(image.url)?.[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

export const reshapeProduct = (product: ShopifyProduct): Product => {
  const {
    images,
    variants,
    collections,
    brand,
    numberOfReviews,
    averageRating,
    ...rest
  } = product;

  let rating = 0;

  if (averageRating?.value) {
    const parsedAverage = JSON.parse(averageRating.value) as {
      value: string;
      scale_min: string;
      scale_max: string;
    } | null;

    rating = parsedAverage?.value ? Number(averageRating.value) : 0;
  }

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
    collections: removeEdgesAndNodes(collections),
    brand: brand?.value ?? null,
    numberOfReviews: numberOfReviews?.value ? Number(numberOfReviews.value) : 0,
    averageRating: rating,
    isGrocery: product.tags.includes("is_grocery"),
    isBestSeller: product.tags.includes("best-seller"),
    metafieldsIds: {
      numberOfReviews: numberOfReviews?.id ?? null,
      averageRating: averageRating?.id ?? null,
      brand: brand?.id ?? null,
    },
  };
};

export const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    const reshapedProduct = reshapeProduct(product);
    reshapedProducts.push(reshapedProduct);
  }

  return reshapedProducts;
};

export const reshapeOrderLineItems = (
  lineItems: ShopifyOrderLineItem[]
): OrderLineItem[] => {
  const reshapedProducts = [];

  for (const lineItem of lineItems) {
    const reshapedLineItem = {
      ...lineItem,
      variant: lineItem.variant
        ? {
            ...lineItem.variant,
            product: reshapeProduct(lineItem.variant.product),
          }
        : null,
    };
    reshapedProducts.push(reshapedLineItem);
  }

  return reshapedProducts;
};

export const reshapeOrder = (order: ShopifyOrder): Order => {
  const { lineItems, ...rest } = order;

  let status: OrderStatus;

  if (order.canceledAt) {
    status = "canceled";
  } else if (
    order.fulfillmentStatus === ShopifyOrderFulfillmentStatus.Fulfilled
  ) {
    status = "completed";
  } else {
    status = "pending";
  }

  return {
    ...rest,
    lineItems: removeEdgesAndNodes(lineItems),
    status,
  };
};

export const reshapeOrders = (orders: ShopifyOrder[]) => {
  const reshapedOrders = [];

  for (const order of orders) {
    const reshapedOrder = reshapeOrder(order);
    reshapedOrders.push(reshapedOrder);
  }

  return reshapedOrders;
};

export const hasProductOptions = (options?: ProductOption[]) => {
  const firstOption = options?.[0];

  if (!firstOption) {
    return false;
  }

  return (
    firstOption.name !== "Title" && firstOption.values[0] !== "Default Title"
  );
};

export const draftOrderLineItemsFromCartLines = (
  cartLines: CartLine[]
): DraftOrderLineItemInput[] => {
  return cartLines.map(cartLine => {
    return {
      quantity: cartLine.quantity,
      variantId: cartLine.merchandise.id,
    };
  });
};

export const getStoreModeFromTags = (tags: string[]): StoreMode => {
  if (
    tags.includes(SHOPIFY_SELLETY_PRODUCT_TAG) &&
    tags.includes(SHOPIFY_GROCERY_PRODUCT_TAG)
  )
    return "sellety";

  if (tags.includes(SHOPIFY_GROCERY_PRODUCT_TAG)) return "grocery";

  return "sellety";
};

/**
 * TODO: these can be improved by infering the types shopify offers from `storefront-api-types`
 */
export const getIdFromShopifyGid = (id: string, type?: "Product" | "Order") =>
  id.split(`gid://shopify/${!type ? "Product" : type}/`)[1];

export const getShopifyLocale = (locale?: Locale): ShopifyLocales => {
  switch (locale) {
    case "ar":
      return "AR";
    case "fr":
      return "FR";
    default:
      return "EN";
  }
};

/**
 * The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes.
 * The utility works with either `nodes` or `edges.node`.
 */
export function flattenConnection<T>(
  connection: PartialDeep<GraphQLConnection<T>>
): PartialDeep<T>[] {
  if (connection.nodes) {
    return connection.nodes as PartialDeep<T>[];
  }

  if (connection.edges) {
    return connection.edges.map(edge => {
      if (!edge.node) {
        throw new Error("Connection edges must contain nodes");
      }
      return edge.node;
    }) as PartialDeep<T>[];
  }

  return [];
}
