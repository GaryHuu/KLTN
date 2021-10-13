import UserLocation from 'features/User/components/UserLocation';
import React from 'react';

function CartLocationConfirm(props) {
  return (
    <div className='cart-location-confirm'>
      <div className='header'>Xác Nhận Thông Tin</div>
      <UserLocation />
    </div>
  );
}

export default CartLocationConfirm;
