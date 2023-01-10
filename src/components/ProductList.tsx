import { useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { GET_PRODUCTS } from '../graphql/queries';
import { OrderContext } from '../orderContext';

type Product = {
  name: string;
  price: number;
  description: string;
  id: string;
};

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductWrapper = styled.div`
  display: flex;
  border: 1px black solid;
  height: 300px;
  width: 700px;
`;

const ProductImg = styled.img`
  width: 150px;
  height: fit-content;
`;

export function ProductList() {
  const { loading, data } = useQuery(GET_PRODUCTS);

  if (!data) return null;
  return (
    <ProductListWrapper>
      {data.products.items.map(
        ({ name, description, id, variants, assets }) => (
          <Product
            name={name}
            description={description}
            key={id}
            assets={assets}
            variants={variants}
            productID={id}
          />
        )
      )}
    </ProductListWrapper>
  );
}

interface ProductProps {
  name: string;
  //price: number;
  description: string;
}

export const Product = ({
  name,
  description,
  assets,
  variants,
  productID,
}: ProductProps) => {
  const [currentVariant, setCurrentVariant] = useState(variants[0]);
  const { addItemToOrder } = useContext(OrderContext);
  const addItem = () => {
    if (!addItemToOrder) return null;
    addItemToOrder({
      variables: {
        Id: productID,
        quantity: 1,
      },
    });
  };

  if (!variants[0] || !currentVariant.product.assets[0]) return null;
  return (
    <ProductWrapper>
      <ProductImg src={currentVariant.product.assets[0].preview} alt="" />
      <div>
        <h2>{name}</h2>
        <h3>${currentVariant.price}</h3>
        <p>{description}</p>
        <button onClick={addItem}>Add to cart</button>
        {variants.map((variant) => {
          return (
            <p
              key={variant.id}
              onClick={() => {
                setCurrentVariant(variant);
              }}
            >
              <b>{variant.name}</b>
            </p>
          );
        })}
      </div>
    </ProductWrapper>
  );
};
