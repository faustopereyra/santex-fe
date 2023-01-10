import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Header } from './components/Header';
import { Product, ProductList } from './components/ProductList';
import { ADD_ITEM_TO_ORDER } from './graphql/mutations';
import { GET_PRODUCTS } from './graphql/queries';
import useStateWithStorage from './hooks/useStateWithStorage';
import { OrderContext, OrdersProvider } from './orderContext';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: {
          items: [
            {
              id: '1',
              name: 'Product 1',
              description: 'Description for product 1',
              assets: [
                {
                  id: '1',
                  name: 'Asset 1',
                  preview: 'preview1.jpg',
                },
              ],
              variants: [
                {
                  id: '1',
                  name: 'Variant 1',
                  price: 100,
                  product: {
                    assets: [
                      {
                        name: 'Asset 1',
                        preview: 'preview1.jpg',
                      },
                    ],
                  },
                  assets: [
                    {
                      id: '1',
                      name: 'Asset 1',
                      preview: 'preview1.jpg',
                    },
                  ],
                },
              ],
            },
            {
              id: '2',
              name: 'Product 2',
              description: 'Description for product 2',
              assets: [
                {
                  id: '2',
                  name: 'Asset 2',
                  preview: 'preview2.jpg',
                },
              ],
              variants: [
                {
                  id: '2',
                  name: 'Variant 2',
                  price: 200,
                  product: {
                    assets: [
                      {
                        name: 'Asset 2',
                        preview: 'preview2.jpg',
                      },
                    ],
                  },
                  assets: [
                    {
                      id: '2',
                      name: 'Asset 2',
                      preview: 'preview2.jpg',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
];

const productProps = {
  name: 'Product 1',
  description: 'Description for product 1',
  assets: [
    {
      id: '1',
      name: 'Asset 1',
      preview: 'preview1.jpg',
    },
  ],
  variants: [
    {
      id: '1',
      name: 'Variant 1',
      price: 100,
      product: {
        assets: [
          {
            name: 'Asset 1',
            preview: 'preview1.jpg',
          },
        ],
      },
      assets: [
        {
          id: '1',
          name: 'Asset 1',
          preview: 'preview1.jpg',
        },
      ],
    },
  ],
  productID: '1',
};

describe('ProductList', () => {
  it('renders text and button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  test('button onClick mutation', async () => {
    const addItemToOrderMock = jest.fn();
    const contextValues = {
      addItemToOrder: addItemToOrderMock,
      order: {},
      loading: false,
    };
    const { getByText } = render(
      <MockedProvider>
        <OrderContext.Provider value={contextValues}>
          <Product {...productProps} />
        </OrderContext.Provider>
      </MockedProvider>
    );

    const button = getByText('Add to cart');
    fireEvent.click(button);
    await waitFor(() =>
      expect(addItemToOrderMock).toHaveBeenCalledWith({
        variables: {
          Id: productProps.productID,
          quantity: 1,
        },
      })
    );
  });
});
