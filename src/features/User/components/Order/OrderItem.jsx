import React from 'react';

function OrderItem({ order }) {
  return (
    <li className='order-item'>
      <span className='code'>{order.id}</span>
      <span className='day'>
        {order.dateOder[1]}
        <br />
        {order.dateOder[0]}
      </span>
      <p className='order-product'>{order.product}</p>
      <p className='order-address'>{order.address}</p>
      <span className='total-price price'>{order.price.toLocaleString() + ' '} đ</span>
      <span className='order-status'>{order.status}</span>
    </li>
  );
}

export default OrderItem;
