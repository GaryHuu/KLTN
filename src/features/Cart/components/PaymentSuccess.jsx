import React from 'react';
import { Link } from 'react-router-dom';

function PaymentSuccess(props) {
  return (
    <div className='payment-success'>
      <div className='header'>Đặt Hàng Thành Công</div>
      <div className='info'>
        <p>Xin cảm ơn quý khách đã mua hàng tại PhanoLink</p>
        <p>
          Đơn hàng <span>#34817</span> của bạn đã được đặt thành công!
        </p>
        <Link className='back-to-home' to='/'>
          &lt; Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
