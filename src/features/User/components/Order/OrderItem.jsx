import React from 'react';

function OrderItem(props) {
  return (
    <li className='order-item'>
      <span className='code'>697318275</span>
      <span className='day'>18/08/2018</span>
      <p className='order-product'>
        Blockchain: Bản Chất Của Blockchain, Bitcoin, Tiền Điện Tử, Hợp Đồng
        Thông Minh Và Tương Lai Của Tiền Tệ...và 03 sản phẩm khác
      </p>
      <span className='total-price'>239.200 đ</span>
      <span className='order-status'>Giao hàng thành công</span>
    </li>
  );
}

export default OrderItem;
