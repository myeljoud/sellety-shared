import { GraphQLClient } from "graphql-request";
import { sleep } from "../utils";
import {
  SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  SHOPIFY_CUSTOMER_CREATE_MUTATION,
  SHOPIFY_CUSTOMER_UPDATE_MUTATION,
} from "./mutations";
import {
  SHOPIFY_GET_COLLECTION_BY_HANDLE_QUERY,
  SHOPIFY_GET_COLLECTION_PRODUCTS_BY_HANDLE_QUERY,
  SHOPIFY_GET_CUSTOMER_QUERY,
  SHOPIFY_GET_ORDER_QUERY,
  SHOPIFY_GET_PRODUCTS_BY_QUERY,
  SHOPIFY_GET_PRODUCT_BY_HANDLE_QUERY,
  SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY,
} from "./queries";
import { SHOPIFY_GET_CUSTOMER_ORDERS } from "./queries/get-customer-orders";
import {
  Collection,
  Connection,
  Product,
  ShopifyCollection,
  ShopifyCollectionArgs,
  ShopifyCollectionProductsArgs,
  ShopifyCustomer,
  ShopifyCustomerAccessTokenCreatePayload,
  ShopifyCustomerArgs,
  ShopifyCustomerCreatePayload,
  ShopifyCustomerUpdatePayload,
  ShopifyMutationCustomerAccessTokenCreateArgs,
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
  reshapeCollection,
  reshapeCustomer,
  reshapeOrder,
  reshapeOrdersV2,
  reshapeProduct,
  reshapeProducts,
} from "./utils";

export const SHOPIFY_LATEST_API_VERSION = "2024-01";

export async function createShopifyClient({
  storeDomain,
  privateAccessToken,
  publicAccessToken,
  apiVersion = SHOPIFY_LATEST_API_VERSION,
}: {
  publicAccessToken: string;
  /**
   * Providing Shopify Private Access Token will override the Public Access Token.
   */
  privateAccessToken?: string;
  /**
   * Store domain needs to be of the format: `https://{{store_name}}.myshopify.com`
   */
  storeDomain: `https://${string}.myshopify.com`;
  /**
   * Storefront API version, defaults to `2024-01`
   */
  apiVersion: string;
}) {
  const endpoint = `${storeDomain}/api/${apiVersion}/graphql.json`;

  const shopifyClient = new GraphQLClient(endpoint, {
    headers: {
      ...(privateAccessToken
        ? { "Shopify-Storefront-Private-Token": privateAccessToken }
        : { "X-Shopify-Storefront-Access-Token": publicAccessToken }),
    },
  });

  return {
    graphqlClient: shopifyClient,

    /**
     * @error customer/customer-not-found Thrown if the customer is not found with the given access token
     */
    async getCustomer(args: ShopifyCustomerArgs) {
      const { customer } = await shopifyClient.request<{
        customer?: ShopifyCustomer;
      }>(SHOPIFY_GET_CUSTOMER_QUERY, {
        ...args,
      });

      if (!customer) {
        throw {
          code: "customer/customer-not-found",
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
      }>(SHOPIFY_GET_CUSTOMER_ORDERS, args);

      if (!customer) {
        throw {
          code: "address/customer-not-found",
        };
      }

      return customer.defaultAddress ?? null;
    },

    /**
     * @error order/customer-not-found Thrown if the customer is not found with the given access token
     */
    async getCustomerOrders(args: ShopifyCustomerArgs) {
      const { customer } = await shopifyClient.request<{
        customer?: Pick<ShopifyCustomer, "orders">;
      }>(SHOPIFY_GET_CUSTOMER_ORDERS, args);

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

      if (!customerUpdate.customer?.id || !customerUpdate.customerAccessToken) {
        throw Error("Couldn't update customer");
      }

      return {
        customerId: customerUpdate.customer.id,
        newCustomerAccessToken: customerUpdate.customerAccessToken,
      };
    },

    async createCustomerAccessToken(
      args: ShopifyMutationCustomerAccessTokenCreateArgs
    ) {
      const { customerAccessTokenCreate } = await shopifyClient.request<
        { customerAccessTokenCreate: ShopifyCustomerAccessTokenCreatePayload },
        ShopifyMutationCustomerAccessTokenCreateArgs
      >(SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, args);

      if (!customerAccessTokenCreate.customerAccessToken?.accessToken) {
        throw Error("Wrong credentials.");
      }

      return customerAccessTokenCreate.customerAccessToken;
    },

    async getProduct(args: ShopifyProductArgs): Promise<Product | undefined> {
      const { product } = await shopifyClient.request<{
        product?: ShopifyProduct;
      }>(SHOPIFY_GET_PRODUCT_BY_HANDLE_QUERY, {
        ...args,
      });

      if (!product) return undefined;

      return reshapeProduct(product);
    },

    async getProducts(args: ShopifyProductsArgs): Promise<Connection<Product>> {
      const { products } = await shopifyClient.request<{
        products: Connection<ShopifyProduct>;
      }>(SHOPIFY_GET_PRODUCTS_BY_QUERY, {
        ...args,
      });

      return {
        pageInfo: products.pageInfo,
        edges: products.edges.map(p => ({
          cursor: p.cursor,
          node: reshapeProduct(p.node),
        })),
      };
    },

    async getProductRecommendations(
      args: ShopifyProductRecommendationsArgs
    ): Promise<Product[]> {
      const { productRecommendations } = await shopifyClient.request<{
        productRecommendations: ShopifyProduct[];
      }>(SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY, {
        ...args,
      });

      return reshapeProducts(productRecommendations);
    },

    async getAllProducts(): Promise<Product[]> {
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

    async getCollectionProducts(
      args: ShopifyCollectionProductsArgs
    ): Promise<Connection<Product>> {
      const { collection } = await shopifyClient.request<{
        collection?: { products: Connection<ShopifyProduct> };
      }>(SHOPIFY_GET_COLLECTION_PRODUCTS_BY_HANDLE_QUERY, {
        ...args,
      });

      if (!collection) {
        throw Error("No collection with the provided handle.");
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
