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

export type ShopifyQueryRootArgs = {
  id: string;
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
  priceRange: ProductPriceRangeV2;
  compareAtPriceRange: ProductPriceRangeV2;
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

export type ShopifyAdminProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  collections: Connection<{
    id: string;
    title: string;
  }>;
  description: string;
  descriptionHtml: string;
  featuredImage?: Maybe<Image>;
  images: Connection<Image>;
  options: ProductOption[];
  priceRangeV2: ProductPriceRangeV2;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  variants: Connection<ShopifyAdminProductVariant>;
};

export type ShopifyAdminProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  inventoryQuantity?: Maybe<number>;
  selectedOptions: SelectedOption[];
  price: string;
  compareAtPrice?: Maybe<string>;
  image?: Maybe<Image>;
  inventoryItem: {
    requiresShipping: boolean;
  };
};

export type ProductPriceRangeV2 = {
  maxVariantPrice: Money;
  minVariantPrice: Money;
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
  lineItems: Connection<ShopifyOrderLineItem>;
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

export type ShopifyAdminOrder = {
  id: string;
  cancelledAt?: Maybe<string>;
  email?: Maybe<string>;
  displayFinancialStatus?: Maybe<ShopifyOrderFinancialStatus>;
  displayFulfillmentStatus: ShopifyOrderFulfillmentStatus;
  lineItems: Connection<ShopifyAdminOrderLineItem>;
  name: string;
  processedAt: string;
  shippingAddress?: Maybe<MailingAddress>;
  totalPriceSet: ShopifyMoneyBag;
  totalShippingPriceSet: ShopifyMoneyBag;
  totalTaxSet?: Maybe<ShopifyMoneyBag>;
  currentSubtotalPriceSet: ShopifyMoneyBag;
  currentTotalPriceSet: ShopifyMoneyBag;
  currentTotalTaxSet: ShopifyMoneyBag;
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

export type ShopifyAdminOrderLineItem = {
  currentQuantity: number;
  originalTotalSet: ShopifyMoneyBag;
  quantity: number;
  title: string;
  variant?: Maybe<
    ShopifyAdminProductVariant & {
      product: ShopifyAdminProduct;
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

export type ShopifyCartBuyerIdentityInput = {
  countryCode?: Maybe<"MR">;
  customerAccessToken?: Maybe<string>;
  deliveryAddressPreferences?: Maybe<
    {
      customerAddressId?: Maybe<string>;
      deliveryAddress?: Maybe<ShopifyMailingAddressInput>;
    }[]
  >;
  email?: Maybe<string>;
  phone?: Maybe<string>;
  walletPreferences?: Maybe<string[]>;
};

export type ShopifyCartLineInput = {
  merchandiseId: string;
  attributes?: Maybe<ShopifyAttributeInput[]>;
  quantity?: Maybe<number>;
  sellingPlanId?: Maybe<string>;
};

export type ShopifyCartLineUpdateInput = Omit<
  ShopifyCartLineInput,
  "merchandiseId"
> & {
  id: string;
  merchandiseId?: Maybe<string>;
};

export type ShopifyCartInput = {
  attributes?: Maybe<ShopifyAttributeInput[]>;
  buyerIdentity?: Maybe<ShopifyCartBuyerIdentityInput>;
  discountCodes?: Maybe<string[]>;
  lines?: Maybe<ShopifyCartLineInput[]>;
  note?: Maybe<string>;
};

export type ShopifyMutationCartCreateArgs = {
  input?: Maybe<ShopifyCartInput>;
};

export type ShopifyCartCreatePayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyMutationCartLinesAddArgs = {
  cartId: string;
  lines: ShopifyCartLineInput[];
};

export type ShopifyCartLinesAddPayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyMutationCartLinesRemoveArgs = {
  cartId: string;
  lineIds: string[];
};

export type ShopifyCartLinesRemovePayload = {
  cart: Maybe<ShopifyCart>;
  userErrors: ShopifyUserError[];
};

export type ShopifyMutationCartLinesUpdateArgs = {
  cartId: string;
  lines: ShopifyCartLineUpdateInput[];
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

export type ShopifyAdminUserError = {
  field?: Maybe<string[]>;
  message: string;
};

export type ShopifyAdminCustomer = {
  addresses: MailingAddress[];
  amountSpent: Money;
  canDelete: boolean;
  createdAt: string;
  defaultAddress?: Maybe<MailingAddress>;
  displayName: string;
  email?: Maybe<string>;
  emailMarketingConsent?: Maybe<{
    consentUpdatedAt?: Maybe<string>;
    marketingOptInLevel?: Maybe<string>;
    marketingState: string;
  }>;
  firstName?: Maybe<string>;
  id: string;
  lastName?: Maybe<string>;
  lifetimeDuration: string;
  locale: string;
  metafield?: Maybe<Metafield>;
  note?: Maybe<string>;
  numberOfOrders: number;
  phone?: Maybe<string>;
  smsMarketingConsent?: Maybe<{
    consentCollectedFrom?: Maybe<string>;
    consentUpdatedAt?: Maybe<string>;
    marketingOptInLevel: string;
    marketingState: string;
  }>;
  tags: string[];
  updatedAt: string;
  validEmailAddress: boolean;
  verifiedEmail: boolean;
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

export type ShopifyAdminDraftOrderCalculatePayload = {
  calculatedDraftOrder?: Maybe<ShopifyAdminCalculatedDraftOrder>;
  userErrors: ShopifyAdminUserError;
};

export type ShopifyAdminDraftOrderCompletePayload = {
  draftOrder?: Maybe<ShopifyAdminDraftOrder>;
  userErrors: ShopifyAdminUserError;
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

export type ShopifyMutationCustomerAddressCreateArgs = {
  address: ShopifyMailingAddressInput;
  customerAccessToken: string;
};

export type ShopifyCustomerAddressCreatePayload = {
  customerAddress?: Maybe<MailingAddress>;
  customerUserErrors: ShopifyUserError[];
};

export type ShopifyMutationCustomerAddressDeleteArgs = {
  customerAccessToken: string;
  id: string;
};

export type ShopifyCustomerAddressDeletePayload = {
  customerUserErrors: ShopifyUserError[];
  deletedCustomerAddressId?: Maybe<string>;
};

export type ShopifyMutationCustomerAddressUpdateArgs = {
  address: ShopifyMailingAddressInput;
  customerAccessToken: string;
  id: string;
};

export type ShopifyCustomerAddressUpdatePayload = {
  customerAddress?: Maybe<MailingAddress>;
  customerUserErrors: ShopifyUserError[];
};

export type ShopifyMutationCustomerDefaultAddressUpdateArgs = {
  addressId: string;
  customerAccessToken: string;
};

export type ShopifyCustomerDefaultAddressUpdatePayload = {
  customer?: Maybe<{
    id: string;
  }>;
  customerUserErrors: ShopifyUserError[];
};

//* ------------------------------- ADMIN ---------------------------

export type ShopifyAdminCustomerInput = {
  addresses?: Maybe<ShopifyAdminMailingAddressInput[]>;
  email?: Maybe<string>;
  firstName?: Maybe<string>;
  id?: Maybe<string>;
  lastName?: Maybe<string>;
  metafields?: Maybe<ShopifyAdminMetafieldInput[]>;
  note?: Maybe<string>;
  phone?: Maybe<string>;
  tags?: Maybe<string[]>;
};

export type ShopifyAdminMutationCustomerUpdateArgs = {
  input: ShopifyAdminCustomerInput;
};

export type ShopifyAdminCustomerUpdatePayload = {
  customer?: Maybe<ShopifyAdminCustomer>;
  userErrors: ShopifyAdminUserError[];
};

export type ShopifyAdminProductInput = {
  descriptionHtml?: Maybe<string>;
  handle?: Maybe<string>;
  id?: Maybe<string>;
  images?: Maybe<
    {
      altText?: Maybe<string>;
      id?: Maybe<string>;
      src?: Maybe<string>;
    }[]
  >;
  metafields?: Maybe<ShopifyAdminMetafieldInput[]>;
  options?: Maybe<string[]>;
  productType?: Maybe<string>;
  status?: Maybe<"DRAFT" | "ACTIVE" | "ARCHIVED">;
  tags?: Maybe<string[]>;
  title?: Maybe<string>;
  variants?: Maybe<ShopifyAdminProductVariantInput[]>;
  vendor?: Maybe<string>;
  seo?: Maybe<{
    description?: Maybe<string>;
    title?: Maybe<string>;
  }>;
};

export type ShopifyAdminProductVariantInput = {
  compareAtPrice?: Maybe<string>;
  harmonizedSystemCode?: Maybe<string>;
  id?: Maybe<string>;
  price?: Maybe<string>;
  productId?: Maybe<string>;
  requiresShipping?: Maybe<boolean>;
  sku?: Maybe<string>;
};

export type ShopifyAdminMutationProductUpdateArgs = {
  input: ShopifyAdminProductInput;
};

export type ShopifyAdminMutationDraftOrderCompleteArgs = {
  id: string;
  paymentGatewayId?: Maybe<string>;
  paymentPending?: Maybe<boolean>;
  sourceName?: Maybe<string>;
};

export type ShopifyAdminMutationDraftOrderCalculateArgs = {
  input: ShopifyAdminDraftOrderInput;
};

export type ShopifyAdminMutationDraftOrderCreateArgs = {
  input: ShopifyAdminDraftOrderInput;
};

export type ShopifyAdminDraftOrderCreatePayload = {
  draftOrder?: Maybe<ShopifyAdminDraftOrder>;
  userErrors: ShopifyAdminUserError[];
};

export type ShopifyAdminMutationDraftOrderUpdateArgs = {
  id: string;
  input: ShopifyAdminDraftOrderInput;
};

export type ShopifyAdminDraftOrderUpdatePayload = {
  draftOrder?: Maybe<ShopifyAdminDraftOrder>;
  userErrors: ShopifyAdminUserError[];
};

export type ShopifyAdminDraftOrderInput = {
  billingAddress?: Maybe<ShopifyAdminMailingAddressInput>;
  customAttributes?: Maybe<ShopifyAttributeInput[]>;
  email?: Maybe<string>;
  lineItems?: Maybe<DraftOrderLineItemInput[]>;
  note?: Maybe<string>;
  phone?: Maybe<string>;
  presentmentCurrencyCode?: Maybe<string>;
  purchasingEntity?: Maybe<{
    customerId?: Maybe<string>;
  }>;
  shippingAddress?: Maybe<ShopifyAdminMailingAddressInput>;
  shippingLine?: Maybe<ShopifyShippingLineInput>;
  sourceName?: Maybe<string>;
  tags?: Maybe<string[]>;
  taxExempt?: Maybe<boolean>;
  useCustomerDefaultAddress?: Maybe<boolean>;
  visibleToCustomer?: Maybe<boolean>;
};

export type ShopifyAttribute = {
  key: string;
  value?: Maybe<string>;
};

export type ShopifyAttributeInput = {
  key: string;
  value: string;
};

export type ShopifyShippingLineInput = {
  price?: Maybe<string>;
  shippingRateHandle?: Maybe<string>;
  title?: Maybe<string>;
};

type BaseMailingAddressInput = {
  address1?: Maybe<string>;
  address2?: Maybe<string>;
  city?: Maybe<string>;
  company?: Maybe<string>;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  phone?: Maybe<string>;
  zip?: Maybe<string>;
};

export type ShopifyMailingAddressInput = BaseMailingAddressInput & {
  country?: Maybe<string>;
  province?: Maybe<string>;
};

export type ShopifyAdminMailingAddressInput = BaseMailingAddressInput & {
  countryCode?: Maybe<string>;
  provinceCode?: Maybe<string>;
};

export type ShopifyAdminMetafieldInput = {
  id?: Maybe<string>;
  key?: Maybe<string>;
  namespace?: Maybe<string>;
  type?: Maybe<string>;
  value?: Maybe<string>;
};

export type ShopifyShippingRate = {
  handle: string;
  price: Money;
  title: string;
};

export type ShopifyAdminShippingLine = {
  id?: Maybe<string>;
  title: string;
  shippingRateHandle?: Maybe<string>;
  originalPriceSet: ShopifyMoneyBag;
};

export type ShopifyMoneyBag = {
  presentmentMoney: Money;
  shopMoney: Money;
};

export type ShopifyAdminDraftOrder = {
  completedAt?: Maybe<string>;
  createdAt: string;
  updatedAt: string;
  currencyCode: string;
  email?: Maybe<string>;
  id: string;
  name: string;
  note2?: Maybe<string>;
  phone?: Maybe<string>;
  ready: boolean;
  customer: {
    id: string;
  };
  lineItems: Connection<ShopifyAdminDraftOrderLineItem>;
  lineItemsSubtotalPrice: ShopifyMoneyBag;
  /** This will only be available for `SHOPIFY_ADMIN_DRAFT_ORDER_COMPLETE_MUTATION` payload */
  order?: Maybe<ShopifyAdminOrder>;
  shippingAddress?: Maybe<MailingAddress>;
  shippingLine?: Maybe<ShopifyAdminShippingLine>;
  status: ShopifyAdminDraftOrderStatus;
  subtotalPrice: string;
  totalDiscountsSet: ShopifyMoneyBag;
  totalLineItemsPriceSet: ShopifyMoneyBag;
  totalPrice: string;
  totalShippingPrice: string;
  totalTax: string;
};

export type ShopifyAdminDraftOrderLineItem = {
  id: string;
  image?: Maybe<Image>;
  name: string;
  originalTotal: string;
  originalUnitPrice: string;
  totalDiscount: string;
  quantity: number;
  variantTitle?: Maybe<string>;
  vendor?: Maybe<string>;
  product: Maybe<{
    id: string;
    handle: string;
    title: string;
  }>;
};

export type ShopifyAdminCalculatedDraftOrder = {
  availableShippingRates: ShopifyShippingRate[];
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

/** The valid statuses for a draft order. */
export enum ShopifyAdminDraftOrderStatus {
  /** The draft order has been paid. */
  Completed = "COMPLETED",
  /** An invoice for the draft order has been sent to the customer. */
  InvoiceSent = "INVOICE_SENT",
  /** The draft order is open. It has not been paid, and an invoice hasn't been sent. */
  Open = "OPEN",
}
