import React from 'react';

function OrderItem({ order }) {
  console.log(order);
  const d = new Date(order.dateOder * 1000).toLocaleDateString();
  const t = new Date(order.dateOder * 1000).toLocaleTimeString();
  return (
    <li className='order-item'>
      <span className='code'>{order.id}</span>
      <span className='day'>
        {t}
        <br />
        {d}
      </span>
      <p className='order-product'>{order.product}</p>
      <p className='order-address'>{order.address}</p>
      <span className='total-price price'>
        {order.price.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </span>
      <span className='order-status'>{order.status}</span>
    </li>
  );
}

export default OrderItem;
