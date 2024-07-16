import { GraphQLClient } from "graphql-request";
import { sleep } from "../utils";
import {
  SHOPIFY_CART_CREATE_MUTATION,
  SHOPIFY_CART_LINES_ADD_MUTATION,
  SHOPIFY_CART_LINES_REMOVE_MUTATION,
  SHOPIFY_CART_LINES_UPDATE_MUTATION,
  SHOPIFY_CREATE_CUSTOMER_ADDRESS_MUTATION,
  SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  SHOPIFY_CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
  SHOPIFY_CUSTOMER_CREATE_MUTATION,
  SHOPIFY_CUSTOMER_UPDATE_MUTATION,
  SHOPIFY_UPDATE_CUSTOMER_ADDRESS_MUTATION,
} from "./mutations";
import {
  SHOPIFY_GET_CART_BY_ID_QUERY,
  SHOPIFY_GET_COLLECTION_BY_HANDLE_QUERY,
  SHOPIFY_GET_CUSTOMER_ADDRESS_QUERY,
  SHOPIFY_GET_CUSTOMER_ORDERS_QUERY,
  SHOPIFY_GET_CUSTOMER_QUERY,
  SHOPIFY_GET_ORDER_QUERY,
  SHOPIFY_GET_PRODUCTS_BY_QUERY,
  SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY,
} from "./queries";
import { SHOPIFY_GET_COLLECTION_PRODUCTS_QUERY } from "./queries/get-collection-products";
import { SHOPIFY_GET_PRODUCT_QUERY } from "./queries/get-product";
import {
  Collection,
  Connection,
  Maybe,
  Product,
  ShopifyCartArgs,
  ShopifyCartCreatePayload,
  ShopifyCartLinesAddPayload,
  ShopifyCartLinesRemovePayload,
  ShopifyCartLinesUpdatePayload,
  ShopifyCartPayload,
  ShopifyCollection,
  ShopifyCollectionArgs,
  ShopifyCollectionProductsArgs,
  ShopifyCollectionProductsPayload,
  ShopifyCustomer,
  ShopifyCustomerAccessTokenCreatePayload,
  ShopifyCustomerAccessTokenRenewPayload,
  ShopifyCustomerAddressCreatePayload,
  ShopifyCustomerAddressUpdatePayload,
  ShopifyCustomerArgs,
  ShopifyCustomerCreatePayload,
  ShopifyCustomerUpdatePayload,
  ShopifyMutationCartCreateArgs,
  ShopifyMutationCartLinesAddArgs,
  ShopifyMutationCartLinesRemoveArgs,
  ShopifyMutationCartLinesUpdateArgs,
  ShopifyMutationCustomerAccessTokenCreateArgs,
  ShopifyMutationCustomerAccessTokenRenewArgs,
  ShopifyMutationCustomerAddressCreateArgs,
  ShopifyMutationCustomerAddressUpdateArgs,
  ShopifyMutationCustomerCreateArgs,
  ShopifyMutationCustomerUpdateArgs,
  ShopifyOrder,
  ShopifyOrderArgs,
  ShopifyProduct,
  ShopifyProductArgs,
  ShopifyProductRecommendationsArgs,
  ShopifyProductsArgs,
} from "./types";
import {
  removeEdgesAndNodes,
  reshapeCart,
  reshapeCollection,
  reshapeCustomer,
  reshapeOrder,
  reshapeOrdersV2,
  reshapeProduct,
  reshapeProducts,
} from "./utils";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";

export const SHOPIFY_LATEST_API_VERSION = "2024-01";

type ShopifyClientBaseOptions = {
  storeId: string;
  /**
   * Storefront API version, defaults to `2024-01`
   */
  apiVersion?: string;
};

type ShopifyClientOptionsPublic = ShopifyClientBaseOptions & {
  type?: "public";
  publicAccessToken: string;
};

type ShopifyClientOptionsPrivate = ShopifyClientBaseOptions & {
  type: "private";
  privateAccessToken: string;
  ipAddress?: string;
};

type ShopifyClientOptions =
  | ShopifyClientOptionsPublic
  | ShopifyClientOptionsPrivate;

export function createShopifyClient({
  storeId,
  apiVersion = SHOPIFY_LATEST_API_VERSION,
  ...rest
}: ShopifyClientOptions) {
  const endpoint = `https://${storeId}.myshopify.com/api/${apiVersion}/graphql.json`;

  const shopifyClient = new GraphQLClient(endpoint);

  if (rest.type === "private") {
    shopifyClient.setHeader(
      "Shopify-Storefront-Private-Token",
      rest.privateAccessToken
    );

    if (rest.ipAddress) {
      shopifyClient.setHeader("Shopify-Storefront-Buyer-IP", rest.ipAddress);
    }
  } else {
    shopifyClient.setHeader(
      "X-Shopify-Storefront-Access-Token",
      rest.publicAccessToken
    );
  }

  return {
    graphqlClient: shopifyClient,

    async getCart(args: ShopifyCartArgs) {
      const { cart } = await shopifyClient.request<ShopifyCartPayload>(
        SHOPIFY_GET_CART_BY_ID_QUERY,
        args
      );

      return cart ? reshapeCart(cart) : null;
    },

    async createCart(args: ShopifyMutationCartCreateArgs) {
      const { cartCreate } =
        await shopifyClient.request<ShopifyCartCreatePayload>(
          SHOPIFY_CART_CREATE_MUTATION,
          args
        );

      return {
        cart: cartCreate.cart && reshapeCart(cartCreate.cart),
        userErrors: cartCreate.userErrors,
      };
    },

    async addCartLines(args: ShopifyMutationCartLinesAddArgs) {
      const { cartLinesAdd } =
        await shopifyClient.request<ShopifyCartLinesAddPayload>(
          SHOPIFY_CART_LINES_ADD_MUTATION,
          args
        );

      return {
        cart: cartLinesAdd.cart && reshapeCart(cartLinesAdd.cart),
        userErrors: cartLinesAdd.userErrors,
      };
    },

    async updateCartLines(args: ShopifyMutationCartLinesUpdateArgs) {
      const { cartLinesUpdate } =
        await shopifyClient.request<ShopifyCartLinesUpdatePayload>(
          SHOPIFY_CART_LINES_UPDATE_MUTATION,
          args
        );

      return {
        cart: cartLinesUpdate.cart && reshapeCart(cartLinesUpdate.cart),
        userErrors: cartLinesUpdate.userErrors,
      };
    },

    async removeCartLines(args: ShopifyMutationCartLinesRemoveArgs) {
      const { cartLinesRemove } =
        await shopifyClient.request<ShopifyCartLinesRemovePayload>(
          SHOPIFY_CART_LINES_REMOVE_MUTATION,
          args
        );

      return {
        cart: cartLinesRemove.cart && reshapeCart(cartLinesRemove.cart),
        userErrors: cartLinesRemove.userErrors,
      };
    },

    /**
     * @error customer/invalid-access-token Thrown if the customer is not found with the given access token
     */
    async getCustomer(args: ShopifyCustomerArgs) {
      const { customer } = await shopifyClient.request<{
        customer?: ShopifyCustomer;
      }>(SHOPIFY_GET_CUSTOMER_QUERY, {
        ...args,
      });

      if (!customer) {
        throw {
          code: "customer/invalid-access-token",
        };
      }

      return reshapeCustomer(customer);
    },

    /**
     * @error address/customer-not-found Thrown if the customer is not found with the given access token
     */
    async getCustomerAddress(args: ShopifyCustomerArgs) {
      const { customer } = await shopifyClient.request<{
        customer?: Pick<ShopifyCustomer, "defaultAddress">;
      }>(SHOPIFY_GET_CUSTOMER_ADDRESS_QUERY, args);

      if (!customer) {
        throw {
          code: "address/customer-not-found",
        };
      }

      return customer.defaultAddress ?? null;
    },

    async createCustomerAddress(
      args: ShopifyMutationCustomerAddressCreateArgs
    ) {
      const { customerAddressCreate } =
        await shopifyClient.request<ShopifyCustomerAddressCreatePayload>(
          SHOPIFY_CREATE_CUSTOMER_ADDRESS_MUTATION,
          args
        );

      return customerAddressCreate;
    },

    async updateCustomerAddress(
      args: ShopifyMutationCustomerAddressUpdateArgs
    ) {
      const { customerAddressUpdate } =
        await shopifyClient.request<ShopifyCustomerAddressUpdatePayload>(
          SHOPIFY_UPDATE_CUSTOMER_ADDRESS_MUTATION,
          args
        );

      return customerAddressUpdate;
    },

    /**
     * @error order/customer-not-found Thrown if the customer is not found with the given access token
     */
    async getCustomerOrders(args: ShopifyCustomerArgs) {
      const { customer } = await shopifyClient.request<{
        customer?: Pick<ShopifyCustomer, "orders">;
      }>(SHOPIFY_GET_CUSTOMER_ORDERS_QUERY, args);

      if (!customer) {
        throw {
          code: "order/customer-not-found",
        };
      }

      return customer.orders ? reshapeOrdersV2(customer.orders) : [];
    },

    async createCustomer(args: ShopifyMutationCustomerCreateArgs) {
      const { customerCreate } = await shopifyClient.request<
        { customerCreate: ShopifyCustomerCreatePayload },
        ShopifyMutationCustomerCreateArgs
      >(SHOPIFY_CUSTOMER_CREATE_MUTATION, args);

      return customerCreate;
    },

    async updateCustomer(args: ShopifyMutationCustomerUpdateArgs) {
      const { customerUpdate } = await shopifyClient.request<
        { customerUpdate: ShopifyCustomerUpdatePayload },
        ShopifyMutationCustomerUpdateArgs
      >(SHOPIFY_CUSTOMER_UPDATE_MUTATION, args);

      return customerUpdate;
    },

    async createCustomerAccessToken(
      args: ShopifyMutationCustomerAccessTokenCreateArgs
    ) {
      const { customerAccessTokenCreate } = await shopifyClient.request<
        { customerAccessTokenCreate: ShopifyCustomerAccessTokenCreatePayload },
        ShopifyMutationCustomerAccessTokenCreateArgs
      >(SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, args);

      return customerAccessTokenCreate;
    },

    async renewCustomerAccessToken(customerAccessToken: string) {
      const { customerAccessTokenRenew } = await shopifyClient.request<
        { customerAccessTokenRenew: ShopifyCustomerAccessTokenRenewPayload },
        ShopifyMutationCustomerAccessTokenRenewArgs
      >(SHOPIFY_CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION, { customerAccessToken });

      return customerAccessTokenRenew;
    },

    async getProduct(args: ShopifyProductArgs) {
      const { product } = await shopifyClient.request<{
        product?: ShopifyProduct;
      }>(SHOPIFY_GET_PRODUCT_QUERY, {
        ...args,
      });

      if (!product) return null;

      return reshapeProduct(product);
    },

    async getProducts(args: ShopifyProductsArgs) {
      const { products } = await shopifyClient.request<{
        products: Connection<ShopifyProduct>;
      }>(SHOPIFY_GET_PRODUCTS_BY_QUERY, {
        ...args,
      });

      return {
        pageInfo: products.pageInfo,
        edges: products.edges.map(product => ({
          cursor: product.cursor,
          node: reshapeProduct(product.node),
        })),
      };
    },

    async getProductRecommendations(args: ShopifyProductRecommendationsArgs) {
      const { productRecommendations } = await shopifyClient.request<{
        productRecommendations: Maybe<ShopifyProduct[]>;
      }>(SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY, args);

      return productRecommendations
        ? reshapeProducts(productRecommendations)
        : [];
    },

    async getAllProducts() {
      let allProducts: ShopifyProduct[] = [];
      let hasNext: boolean | undefined;
      let cursor: string | null = null;

      async function fetchProducts() {
        const { products } = await shopifyClient.request<{
          products: Connection<ShopifyProduct>;
        }>(SHOPIFY_GET_PRODUCTS_BY_QUERY, { cursor });

        allProducts = allProducts.concat(removeEdgesAndNodes(products));
        hasNext = products.pageInfo.hasNextPage;
        cursor = products.pageInfo.endCursor ?? null;
      }

      while (hasNext) {
        // eslint-disable-next-line no-await-in-loop
        await fetchProducts();
        // eslint-disable-next-line no-await-in-loop
        await sleep(1000);
      }

      return reshapeProducts(allProducts);
    },

    async getCollection(args: ShopifyCollectionArgs): Promise<Collection> {
      const { collection } = await shopifyClient.request<{
        collection?: ShopifyCollection;
      }>(SHOPIFY_GET_COLLECTION_BY_HANDLE_QUERY, {
        ...args,
      });

      if (!collection) {
        throw Error("No collection with the provided handle.");
      }

      return reshapeCollection(collection);
    },

    async getCollectionProducts(args: ShopifyCollectionProductsArgs) {
      const { collection } =
        await shopifyClient.request<ShopifyCollectionProductsPayload>(
          SHOPIFY_GET_COLLECTION_PRODUCTS_QUERY,
          args
        );

      if (!collection) {
        return null;
      }

      return {
        pageInfo: collection.products.pageInfo,
        edges: collection.products.edges.map(product => ({
          cursor: product.cursor,
          node: reshapeProduct(product.node),
        })),
      };
    },

    async getOrder(args: ShopifyOrderArgs) {
      const { node } = await shopifyClient.request<
        { node: ShopifyOrder | null },
        ShopifyOrderArgs
      >(SHOPIFY_GET_ORDER_QUERY, args);

      if (!node) return null;

      return reshapeOrder(node);
    },
  };
}

export type ShopifyClient = ReturnType<typeof createShopifyClient>;
