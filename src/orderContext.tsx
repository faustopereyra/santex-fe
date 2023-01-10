import {
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
} from '@apollo/client';
import { createContext, FC, useEffect } from 'react';
import { ADD_ITEM_TO_ORDER } from './graphql/mutations';
import useStateWithStorage from './hooks/useStateWithStorage';

interface OrderContextType {
  order: any;
  loading: boolean;
  //subTotal: number;
  addItemToOrder?: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

export const OrderContext = createContext<OrderContextType>({
  order: {},
  loading: false,
});

export const OrdersProvider: FC = ({ children }) => {
  const [addItemToOrder, { data, loading }] = useMutation(ADD_ITEM_TO_ORDER);
  const [order, setOrder] = useStateWithStorage<number>('order', 0);

  useEffect(() => {
    if (data) {
      setOrder(data.addItemToOrder);
    }
  }, [data]);

  const value = { order, loading, addItemToOrder };

  console.log(order);
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
