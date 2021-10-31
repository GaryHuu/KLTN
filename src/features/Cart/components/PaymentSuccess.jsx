import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function PaymentSuccess(props) {
  const {location : { state }} = props;
  return (
    <div className='payment-success'>
      <div className='header'>Đặt Hàng Thành Công</div>
      <div className='info'>
        <p>Xin cảm ơn quý khách đã mua hàng tại PhanoLink</p>
        <p>
          Đơn hàng
          <Link to='/user/order?page=1&with=address,order_details.product.images&perPage=6'>
            <span>&nbsp;#{state}&nbsp;</span>
          </Link>
          của bạn đã được đặt thành công!
        </p>
        <Link className='back-to-home' to='/'>
          &lt; Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default withRouter(PaymentSuccess);
