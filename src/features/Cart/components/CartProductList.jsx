import React from 'react';
import CartItem from './CartItem';

function CartProductList(props) {
  return (
    <div className='cart__left__product'>
      <p>
        <span>Sản Phẩm</span>
        <span>Giá</span>
        <span>Số Lượng</span>
      </p>
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

export default CartProductList;
