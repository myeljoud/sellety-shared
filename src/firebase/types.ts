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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
