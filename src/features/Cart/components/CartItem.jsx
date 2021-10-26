import productApi from 'api/productApi';
import product01 from 'assets/img/product1.jpg';
import withLoading from 'components/HOC/withLoading';
import Quantity from 'components/Quantity';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemCart } from '../cartSlice';

function CartItem({ item, onChange, hideLoading, showLoading }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [imgURL, setImgURL] = useState();
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
        setImgURL(data[0].images[0].url);
        setProduct(data[0]);
        console.log(data[0]);
      } catch (error) {}
      setLoading(false);
      hideLoading();
    })();
  }, [item.idProduct]);

  return (
    <div className='item'>
      <Link to={`/product/${item.idProduct}`}>
        <img src={imgURL} alt='' />
      </Link>
      <div className='item__info'>
        <div className='description'>
          <p>{product.name}</p>
          <span onClick={handleButtonDeleteClick}>Xóa</span>
        </div>
        <div className='price'>
          <p className='price__new'>
            {isPromo && priceAfterDiscount
              ? (priceAfterDiscount * item.quantity).toLocaleString()
              : price * item.quantity
              ? (price * item.quantity).toLocaleString()
              : ''}
           &nbsp;đ
          </p>
          {product.discount !== 'No' && (
            <span className='price__discount'>-{product.discount}</span>
          )}
          {isPromo && (
            <span className='price__old'>
              {(price * item.quantity).toLocaleString()}&nbsp;đ
            </span>
          )}
        </div>
        <Quantity count={item.quantity} onChange={handleQuantityChange} />
      </div>
    </div>
  );
}

export default withLoading(CartItem);
