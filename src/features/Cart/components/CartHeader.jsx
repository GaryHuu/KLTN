import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from '../selector';

function CartHeader(props) {
  const countCart = useSelector(cartItemsCountSelector);
  return (
    <div className='cart__left__header'>
      <p>GIỎ HÀNG</p>
      <p>({countCart} Sản Phẩm)</p>
    </div>
  );
}

export default CartHeader;
