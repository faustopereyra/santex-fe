import { gql } from '@apollo/client';

// Define mutation
export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($Id: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $Id, quantity: $quantity) {
      ... on Order {
        id
        subTotal
        total
      }
    }
  }
`;

//  mutation addItemToOrder {
//    productVariantId
//    quantity
//  }
