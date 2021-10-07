import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';

function CartTotal() {
  const location = useLocation();
  const path = useRouteMatch();
  const history = useHistory();

  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.pathname === '/cart/confirm') setIsConfirm(true);
    else setIsConfirm(false);

    if (location.pathname === '/cart/success') setIsSuccess(true);
    else setIsSuccess(false);
  }, [location.pathname]);

  const handleClick = () => {
    if (!isConfirm) {
      history.push(`${path.url}/confirm`);
      setIsConfirm(true);
      return;
    }

    // Delete Cart

    toast.success('Đặt Hàng Thành Công!');
    history.push(`${path.url}/success`);
  };

  return (
    <>
      {isSuccess || isConfirm || (
        <div className='discount__code'>
          <h2>Mã Giảm Giá</h2>
          <form action=''>
            <input type='text' placeholder='Nhập mã giảm giá....' />
            <button>ÁP DỤNG</button>
          </form>
        </div>
      )}

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

      {isSuccess || (
        <button style={{ cursor: 'pointer' }} onClick={handleClick}>
          {!isConfirm ? 'TIẾN HÀNH ĐẶT HÀNG' : 'XÁC NHẬN THANH TOÁN'}
        </button>
      )}
    </>
  );
}

export default CartTotal;
