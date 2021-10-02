import React from 'react';
import cartEmptyIcon from 'assets/img/cart-mty.png';
import { Link } from 'react-router-dom';
function CartEmpty(props) {
  return (
    <div className='cart-empty'>
      <img src={cartEmptyIcon} alt='' />
      <h5>Không có sản phẩm nào trong giỏ hàng của bạn.</h5>
      <Link className='link' to='/product'>
        &lt; &nbsp; Tiếp Tục Mua Sắm
      </Link>
    </div>
  );
}

export default CartEmpty;
