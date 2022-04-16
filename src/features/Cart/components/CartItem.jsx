import productApi from 'api/productApi';
import withLoading from 'components/HOC/withLoading';
import Quantity from 'components/Quantity';
import React, { Fragment, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemCart } from '../cartSlice';

function CartItem({ item, onChange, hideLoading, showLoading }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const isPromo = product?.discount !== 'No';
  const price = parseInt(product?.price);
  let discountPercent;
  let priceAfterDiscount;
  if (isPromo) {
    discountPercent = parseInt(product?.discount?.slice(0, -1)) / 100;
    priceAfterDiscount = parseInt(price) - parseInt(price) * discountPercent;
  }
  const handleButtonDeleteClick = () => {
    // console.log(product.id);
    const action = deleteItemCart(product.id);
    dispatch(action);
  };

  const handleQuantityChange = (value) => {
    if (!onChange) return;
    onChange(item.idProduct, value);
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      showLoading();
      try {
        const { data } = await productApi.getProductByID(item.idProduct);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      hideLoading();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.idProduct]);

  return (
    <div className='item'>
      {loading ? (
        <Skeleton height={65} width={55} />
      ) : (
        <Link to={`/product/${item.idProduct}`}>
          <img src={product?.images[0]?.url} alt='' />
        </Link>
      )}
      <div className='item__info'>
        <div className='description'>
          {loading ? (
            <Fragment>
              <Skeleton
                style={{ marginTop: '-11px' }}
                height={17}
                width={200}
              />
              <Skeleton style={{ marginTop: '-11px' }} height={17} width={60} />
            </Fragment>
          ) : (
            <Fragment>
              <p>{product.name}</p>
              <span onClick={handleButtonDeleteClick}>Xóa</span>
            </Fragment>
          )}
        </div>
        <div className='price'>
          {loading ? (
            <Fragment>
              <Skeleton height={20} width={120} />
              <Skeleton height={20} width={90} />
            </Fragment>
          ) : (
            <Fragment>
              <p className='price__new'>
                {isPromo && priceAfterDiscount
                  ? (priceAfterDiscount * item.quantity).toLocaleString(
                      'it-IT',
                      {
                        style: 'currency',
                        currency: 'VND',
                      }
                    )
                  : price * item.quantity
                  ? (price * item.quantity).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })
                  : ''}
                &nbsp;
              </p>
              {product.discount !== 'No' && (
                <span className='price__discount'>-{product.discount}</span>
              )}
              {isPromo && (
                <span className='price__old'>
                  {(price * item.quantity).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                  &nbsp;
                </span>
              )}
            </Fragment>
          )}
        </div>
        {loading ? (
          <Skeleton height={25} width={130} />
        ) : (
          <Quantity count={item.quantity} onChange={handleQuantityChange} />
        )}
      </div>
    </div>
  );
}

export default withLoading(CartItem);
