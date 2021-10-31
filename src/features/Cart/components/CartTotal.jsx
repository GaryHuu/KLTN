import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { cartDiscountSelector, cartTotalSelector } from '../selector';
import userApi from 'api/userApi';
import { useDispatch } from 'react-redux';
import { paymentSuccess } from '../cartSlice';
import withLoading from 'components/HOC/withLoading';

function CartTotal({ showLoading, hideLoading }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = useRouteMatch();
  const history = useHistory();
  const price = useSelector(cartTotalSelector);
  const discount = useSelector(cartDiscountSelector);
  const user = useSelector((state) => state.user.current);
  const cart = useSelector((state) => state.cart.cartItems);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.pathname === '/cart/confirm') setIsConfirm(true);
    else setIsConfirm(false);

    if (location.pathname === '/cart/success') setIsSuccess(true);
    else setIsSuccess(false);
  }, [location.pathname]);

  const handleClick = async () => {
    if (!isConfirm) {
      history.push(`${path.url}/confirm`);
      setIsConfirm(true);
      return;
    }

    // Delete Cart
    if (
      user &&
      user.addressId !== null &&
      user.addressId !== undefined &&
      cart
    ) {
      const cartTotal = cart.map((item) => {
        const i = { ...item };
        if (i.priceAfterDiscount) delete i.priceAfterDiscount;
        if (i.idProduct) {
          i.id = i.idProduct;
          delete i.idProduct;
        }
        return i;
      });
      const dataSend = {
        total: price,
        payment_method: 'Cash on Delivery',
        status: 1,
        address_id: user.addressId,
        products: [...cartTotal],
      };
      showLoading();
      try {
        const rs = await userApi.order(dataSend);
        if (rs.status === 200) {
          const action = paymentSuccess();
          dispatch(action);
          toast.success('Đặt Hàng Thành Công!');
          history.replace(`${path.url}/success`, rs.data.id);
        }
      } catch (error) {
        console.log(error);
      }
      hideLoading();
    } else {
      toast.error('Vui lòng cập nhật thông tin đặt hàng');
    }
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
          <span>{price && (price + (discount || 0)).toLocaleString()} đ</span>
        </p>
        <p>
          <span>Giảm Giá:</span>{' '}
          <span>{discount && discount.toLocaleString()} đ</span>
        </p>
        <p>
          <span>Thành Tiền:</span>{' '}
          <span>{price && price.toLocaleString()} đ</span>
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

export default withLoading(CartTotal);
