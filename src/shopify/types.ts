export type Maybe<T> = T | null;

export type ShopifyLocales = "AR" | "FR" | "EN";

export type Connection<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type PageInfo = {
  endCursor?: Maybe<string>;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: Maybe<string>;
};

export type Customer = Omit<
  ShopifyCustomer,
  "addresses" | "orders" | "extraData"
> & {
  addresses: MailingAddress[];
  orders: Order[];
  extraData: Maybe<ShopifyCustomerExtraDataShape>;
  extraDataMetafieldId: Maybe<string>;
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartLine[];
};

export type CartLine = Omit<ShopifyCartLine, "merchandise"> & {
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: Product;
    quantityAvailable: number;
  };
};

export type Product = Omit<
  ShopifyProduct,
  | "variants"
  | "images"
  | "collections"
  | "brand"
  | "numberOfReviews"
  | "averageRating"
> & {
  variants: ProductVariant[];
  images: Image[];
  collections: {
    id: string;
    title: string;
  }[];
  brand: string | null;
  numberOfReviews: number;
  averageRating: number;
  isGrocery: boolean;
  isBestSeller: boolean;
  metafieldsIds: {
    numberOfReviews: Maybe<string>;
    averageRating: Maybe<string>;
    brand: Maybe<string>;
  };
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: Maybe<number>;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money;
  image: Image;
  requiresShipping: boolean;
};

export type Collection = Omit<ShopifyCollection, "products"> & {
  path: string;
};

export type Order = Omit<ShopifyOrder, "lineItems"> & {
  lineItems: OrderLineItem[];
  status: OrderStatus;
};

export type OrderLineItem = Omit<ShopifyOrderLineItem, "variant"> & {
  variant?: Maybe<
    ProductVariant & {
      product: Product;
    }
  >;
};

export type SEO = {
  title: string;
  description: string;
};

export type Image = {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type MailingAddress = {
  id: string;
  address1?: Maybe<string>;
  address2?: Maybe<string>;
  city?: Maybe<string>;
  country?: Maybe<string>;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  phone?: Maybe<string>;
};

export type Metafield = {
  id: string;
  key: string;
  namespace: string;
  value: string;
};

export type ShopifyCustomer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  email?: Maybe<string>;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  phone?: Maybe<string>;
  numberOfOrders: number;
  defaultAddress?: Maybe<MailingAddress>;
  addresses: Connection<MailingAddress>;
  orders: Connection<ShopifyOrder>;
  extraData: Maybe<Metafield>;
};

export type ShopifyCart = {
  id: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Maybe<Money>;
  };
  lines: Connection<ShopifyCartLine>;
  totalQuantity: number;
  note?: Maybe<string>;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: ShopifyProduct;
    quantityAvailable: number;
  };
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  vendor: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  collections: Connection<{
    id: string;
    title: string;
  }>;
  tags: string[];
  updatedAt: string;
  brand: Maybe<Metafield>;
  numberOfReviews: Maybe<Metafield>;
  averageRating: Maybe<Metafield>;
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  products: Connection<ShopifyProduct>;
};

export type ShopifyOrder = {
  id: string;
  canceledAt?: string;
  email?: Maybe<string>;
  financialStatus?: Maybe<ShopifyOrderFinancialStatus>;
  fulfillmentStatus: ShopifyOrderFulfillmentStatus;
  lineItems: Connection<OrderLineItem>;
  name: string;
  orderNumber: number;
  processedAt: string;
  shippingAddress?: Maybe<MailingAddress>;
  totalPrice: Money;
  totalShippingPrice: Money;
  totalTax?: Maybe<Money>;
  currentSubtotalPrice: Money;
  currentTotalPrice: Money;
  currentTotalTax: Money;
};

export type ShopifyOrderLineItem = {
  currentQuantity: number;
  originalTotalPrice: Money;
  quantity: number;
  title: string;
  variant?: Maybe<
    ProductVariant & {
      product: ShopifyProduct;
    }
  >;
};

export type DraftOrderLineItemInput = {
  quantity: number;
  variantId: string;
};

export type OrderStatus = "completed" | "pending" | "canceled";

export type ShopifyCustomerExtraDataShape = {
  cartId?: string;
};

export type ShopifyProductsArgs = {
  after?: Maybe<string>;
  before?: Maybe<string>;
  first?: Maybe<number>;
  last?: Maybe<number>;
  query?: Maybe<string>;
  reverse?: Maybe<boolean>;
  sortKey?: Maybe<ShopifyProductSortKeys>;
  locale: ShopifyLocales;
};

export type ShopifyProductArgs = {
  handle: string;
  locale: ShopifyLocales;
};

export type ShopifyProductRecommendationsArgs = {
  productId: string;
  locale: ShopifyLocales;
  intent?: "COMPLEMENTARY" | "RELATED" | null;
};

export type ShopifyCollectionArgs = {
  handle: string;
  locale: ShopifyLocales;
};

export type ShopifyCollectionProductsArgs = {
  handle: string;
  locale: ShopifyLocales;
  after?: Maybe<string>;
  before?: Maybe<string>;
  first?: Maybe<number>;
  last?: Maybe<number>;
};

export type ShopifyCustomerArgs = {
  customerAccessToken: string;
};

export type ShopifyOrderArgs = {
  id: string;
  locale: ShopifyLocales;
};

export type ShopifyCartCreatePayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyCartLinesAddPayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyCartLinesRemovePayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyCartLinesUpdatePayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyUserError = {
  code?: Maybe<string>;
  field?: Maybe<string[]>;
  message: string;
};

export type ShopifyCustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

export type ShopifyCustomerAccessTokenCreatePayload = {
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  customerUserErrors: ShopifyUserError[];
};

export type ShopifyCustomerCreatePayload = {
  customer?: Maybe<ShopifyCustomer>;
  customerUserErrors: ShopifyUserError[];
};

export type ShopifyCustomerUpdatePayload = {
  customer?: Maybe<ShopifyCustomer>;
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  customerUserErrors: ShopifyUserError[];
};

export type ShopifyMutationCustomerAccessTokenCreateArgs = {
  input: {
    email: string;
    password: string;
  };
};

export type ShopifyMutationCustomerCreateArgs = {
  input: {
    email: string;
    password: string;
    acceptsMarketing?: Maybe<boolean>;
    firstName?: Maybe<string>;
    lastName?: Maybe<string>;
    phone?: Maybe<string>;
  };
};

export type ShopifyMutationCustomerUpdateArgs = {
  customer: {
    acceptsMarketing?: Maybe<boolean>;
    email?: Maybe<string>;
    firstName?: Maybe<string>;
    lastName?: Maybe<string>;
    password?: Maybe<string>;
    phone?: Maybe<string>;
  };
  customerAccessToken: string;
};

export type ShopifyMutationDraftOrderCompleteArgs = {
  id: string;
  paymentGatewayId?: Maybe<string>;
  paymentPending?: Maybe<boolean>;
  sourceName?: Maybe<string>;
};

export enum ShopifyOrderFinancialStatus {
  /** Displayed as **Authorized**. */
  Authorized = "AUTHORIZED",
  /** Displayed as **Paid**. */
  Paid = "PAID",
  /** Displayed as **Partially paid**. */
  PartiallyPaid = "PARTIALLY_PAID",
  /** Displayed as **Partially refunded**. */
  PartiallyRefunded = "PARTIALLY_REFUNDED",
  /** Displayed as **Pending**. */
  Pending = "PENDING",
  /** Displayed as **Refunded**. */
  Refunded = "REFUNDED",
  /** Displayed as **Voided**. */
  Voided = "VOIDED",
}

export enum ShopifyOrderFulfillmentStatus {
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  Fulfilled = "FULFILLED",
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  InProgress = "IN_PROGRESS",
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  OnHold = "ON_HOLD",
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  Open = "OPEN",
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  PartiallyFulfilled = "PARTIALLY_FULFILLED",
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  PendingFulfillment = "PENDING_FULFILLMENT",
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  Restocked = "RESTOCKED",
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  Scheduled = "SCHEDULED",
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  Unfulfilled = "UNFULFILLED",
}

export enum ShopifyProductSortKeys {
  /** Sort by the `best_selling` value. */
  BestSelling = "BEST_SELLING",
  /** Sort by the `created_at` value. */
  CreatedAt = "CREATED_AT",
  /** Sort by the `id` value. */
  Id = "ID",
  /** Sort by the `price` value. */
  Price = "PRICE",
  /** Sort by the `product_type` value. */
  ProductType = "PRODUCT_TYPE",
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = "RELEVANCE",
  /** Sort by the `title` value. */
  Title = "TITLE",
  /** Sort by the `updated_at` value. */
  UpdatedAt = "UPDATED_AT",
  /** Sort by the `vendor` value. */
  Vendor = "VENDOR",
}
