import { useContext } from 'react';
import { OrderContext } from '../orderContext';

export function Header() {
  const { order } = useContext(OrderContext);
  const subTotal = order.subTotal || 0;
  return (
    <header style={{ background: 'red' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>$ {subTotal}</div>
    </header>
  );
}
