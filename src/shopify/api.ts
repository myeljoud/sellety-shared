import {
  removeEdgesAndNodes,
  reshapeCollection,
  reshapeCustomer,
  reshapeOrder,
  reshapeProduct,
  reshapeProducts,
  shopifyClient,
} from "./index";
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
import type {
  Collection,
  Connection,
  Customer,
  ShopifyCustomerAccessTokenCreatePayload,
  ShopifyCustomerCreatePayload,
  ShopifyCustomerUpdatePayload,
  ShopifyMutationCustomerAccessTokenCreateArgs,
  ShopifyMutationCustomerCreateArgs,
  ShopifyMutationCustomerUpdateArgs,
  Product,
  ShopifyCollection,
  ShopifyCollectionArgs,
  ShopifyCollectionProductsArgs,
  ShopifyCustomer,
  ShopifyCustomerArgs,
  ShopifyOrder,
  ShopifyOrderArgs,
  ShopifyProduct,
  ShopifyProductArgs,
  ShopifyProductRecommendationsArgs,
  ShopifyProductsArgs,
} from "./types";
import { sleep } from "../utils";

export async function getCustomer(
  args: ShopifyCustomerArgs
): Promise<Customer | undefined> {
  const { customer } = await shopifyClient.request<{
    customer?: ShopifyCustomer;
  }>(SHOPIFY_GET_CUSTOMER_QUERY, {
    ...args,
  });

  if (!customer) {
    throw Error("There is no customer with the supplied `accessToken`.");
  }

  return reshapeCustomer(customer);
}

export async function createCustomer(args: ShopifyMutationCustomerCreateArgs) {
  const { customerCreate } = await shopifyClient.request<
    { customerCreate: ShopifyCustomerCreatePayload },
    ShopifyMutationCustomerCreateArgs
  >(SHOPIFY_CUSTOMER_CREATE_MUTATION, args);

  if (!customerCreate.customer) {
    throw Error("Couldn't create customer");
  }

  return {
    customer: customerCreate.customer,
    customerUserErrors: customerCreate.customerUserErrors,
  };
}

export async function updateCustomer(args: ShopifyMutationCustomerUpdateArgs) {
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
}

export async function createCustomerAccessToken(
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
}

export async function getProduct(
  args: ShopifyProductArgs
): Promise<Product | undefined> {
  const { product } = await shopifyClient.request<{
    product?: ShopifyProduct;
  }>(SHOPIFY_GET_PRODUCT_BY_HANDLE_QUERY, {
    ...args,
  });

  if (!product) return undefined;

  return reshapeProduct(product);
}

export async function getProducts(
  args: ShopifyProductsArgs
): Promise<Connection<Product>> {
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
}

export async function getProductRecommendations(
  args: ShopifyProductRecommendationsArgs
): Promise<Product[]> {
  const { productRecommendations } = await shopifyClient.request<{
    productRecommendations: ShopifyProduct[];
  }>(SHOPIFY_GET_PRODUCT_RECOMMENDATIONS_QUERY, {
    ...args,
  });

  return reshapeProducts(productRecommendations);
}

export async function getAllProducts(): Promise<Product[]> {
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
}

export async function getCollection(
  args: ShopifyCollectionArgs
): Promise<Collection> {
  const { collection } = await shopifyClient.request<{
    collection?: ShopifyCollection;
  }>(SHOPIFY_GET_COLLECTION_BY_HANDLE_QUERY, {
    ...args,
  });

  if (!collection) {
    throw Error("No collection with the provided handle.");
  }

  return reshapeCollection(collection);
}

export async function getCollectionProducts(
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
}

export async function getOrder(args: ShopifyOrderArgs) {
  const { node } = await shopifyClient.request<
    { node: ShopifyOrder | null },
    ShopifyOrderArgs
  >(SHOPIFY_GET_ORDER_QUERY, args);

  if (!node) return null;

  return reshapeOrder(node);
}
