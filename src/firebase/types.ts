import { Timestamp } from "@google-cloud/firestore";

export interface FirestoreUserDocument {
  expoPushToken?: string | null;
  ougiyaFormat?: "MRU" | "MRO" | null;
  cartId?: string | null;
  drafOrderId?: string | null;
  address?: FirestoreUserAddress | null;
  email?: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
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

export type FirestoreProductDocument = {
  id: string;
  averageRating: number;
  ratingCount: number;
  imageUrl: string;
  title: string;
  handle: string;
  vendor: string | null;
  brand: string | null;
  isBestseller: boolean;
  isGrocey: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type FirestoreProductDocumentInput = {
  id: string;
  imageUrl: string;
  title: string;
  handle: string;
  vendor: string | null;
  brand: string | null;
  isBestseller: boolean;
  isGrocey: boolean;
};

export type FirestoreProductReview = {
  userId: string;
  body: string;
  rating: number;
  reviewerName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  reviewerPhotoUrl: string | null;
  customerId: string | null;
};

export type FirestoreProductReviewInput = {
  userId: string;
  body: string;
  rating: number;
  reviewerName: string;
  reviewerPhotoUrl: string | null;
  customerId: string | null;
};

export type FunctionsAccountDeletionRequestArgs = {
  email: string;
  name: string;
  inquiry: string;
};

export type FunctionsAccountDeletionRequestPayload = {
  success: boolean;
};

export type FunctionsSaveAnonUsersDataArgs = {
  expoPushToken: string;
};

export type FunctionsAddProductReviewArgs = {
  productId: string;
  review: FirestoreProductReviewInput;
  product: FirestoreProductDocumentInput;
};

export { Timestamp };
