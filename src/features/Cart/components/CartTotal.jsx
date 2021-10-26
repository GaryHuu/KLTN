import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { cartDiscountSelector, cartTotalSelector } from '../selector';

function CartTotal() {
  const location = useLocation();
  const path = useRouteMatch();
  const history = useHistory();
  const price = useSelector(cartTotalSelector)
  const discount = useSelector(cartDiscountSelector)

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
    history.replace(`${path.url}/success`);
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
          <span>Tạm Tính:</span>
          <span>{price  && (price + (discount || 0)).toLocaleString()} đ</span>
        </p>
        <p>
          <span>Giảm Giá:</span> <span>{discount && discount.toLocaleString()} đ</span>
        </p>
        <p>
          <span>Thành Tiền:</span> <span>{price && price.toLocaleString()} đ</span>
        </p>
        <span>(Đã bao gồm VAT nếu có)</span>
      </div>

      {isSuccess || (
        <>
          <button onClick={handleClick}>
            {!isConfirm ? 'TIẾN HÀNH ĐẶT HÀNG' : 'XÁC NHẬN THANH TOÁN'}
          </button>
          <button
            className='back'
            onClick={() => {
              history.goBack();
            }}
          >
            QUAY LẠI
          </button>
        </>
      )}
    </>
  );
}

export default CartTotal;
