import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql(`
  query GetProducts {
    products {
      items {
        id
        name
        description
        assets {
          id
          name
          preview
        }
        variants {
          id
          name
          price
          product {
            assets {
              name
              preview
            }
          }
          assets {
            id
            name
            preview
          }
        }
      }
    }
  }
`);

/*
  query {
    products {
      items {
        id
        name
        description
        variantList {
          items {
            id
            name
            price
            assets {
              id
              source
              preview
            }
          }
        }
      }
    }
  }
*/
