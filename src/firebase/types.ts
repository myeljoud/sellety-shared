export interface FirestoreUserDocument {
  expoPushToken?: string | null;
  ougiyaFormat?: "MRU" | "MRO" | null;
  cartId?: string | null;
  drafOrderId?: string | null;
  address?: FirestoreUserAddress | null;
  customerId?: string | null;
  customerEmail?: string | null;
  customerAccessToken?: string | null;
  customerAccessTokenExpiresAt?: string | null;
}

export type FirestoreUserAddress = {
  address1?: string | null;
  address2?: string | null;
  displayName?: string | null;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
};
