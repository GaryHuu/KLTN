import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeToCart } from '../cartSlice';
import CartItem from './CartItem';
function CartProductList(props) {
  const cartItem = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  console.log(cartItem);
  const onChange = (idProduct, quantity) => {
    console.log({idProduct, quantity});
    const action = changeToCart({
      idProduct, quantity
    });
    dispatch(action);
  }
  return (
    <div className='cart__left__product'>
      <p>
        <span>Sản Phẩm</span>
        <span>Giá</span>
        <span>Số Lượng</span>
      </p>
      {cartItem &&
        cartItem.map((item, idx) => (
          <CartItem onChange={onChange} item={item} key={idx} />
        ))}
    </div>
  );
}

export default CartProductList;
