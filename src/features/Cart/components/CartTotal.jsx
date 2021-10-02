import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

function CartTotal() {
  const location = useLocation();
  const path = useRouteMatch();
  const history = useHistory();
  console.log(location);

  const [isConfirm, setIsConfirm] = useState(() => {
    console.log(location.pathname === '/cart/confirm');
    return location.pathname === '/cart/confirm';
  });

  const handleClick = () => {
    if (!isConfirm) {
      history.push(`${path.url}/confirm`);
      setIsConfirm(true);
      return;
    }

    console.log('Đã Xác Nhận');
    history.push('/');
  };

  return (
    <>
      <div className='discount__code'>
        <h2>Mã Giảm Giá</h2>
        <form action=''>
          <input type='text' placeholder='Nhập mã giảm giá....' />
          <button>ÁP DỤNG</button>
        </form>
      </div>
      <div className='checkout'>
        <p>
          <span>Tạm Tính:</span> <span>1.080.000 đ</span>
        </p>
        <p>
          <span>Giảm Giá:</span> <span>80.000 đ</span>
        </p>
        <p>
          <span>Thành Tiền:</span> <span>1.000.000 đ</span>
        </p>
        <span>(Đã bao gồm VAT nếu có)</span>
      </div>
      <button style={{ cursor: 'pointer' }} onClick={handleClick}>
        {!isConfirm ? 'TIẾN HÀNH ĐẶT HÀNG' : 'XÁC NHẬN THANH TOÁN'}
      </button>
    </>
  );
}

export default CartTotal;
