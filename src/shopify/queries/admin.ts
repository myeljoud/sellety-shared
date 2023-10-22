import { SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT } from "../fragments";

export const SHOPIFY_ADMIN_GET_DRAFT_ORDER_QUERY = /* GraphQL */ `
  query getDraftOrder($id: ID!) {
    draftOrder(id: $id) {
      ...AdminDraftOrderFragment
    }
  }

  ${SHOPIFY_ADMIN_DRAFT_ORDER_FRAGMENT}
`;
