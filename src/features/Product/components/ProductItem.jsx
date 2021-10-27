import freeshipIcon from 'assets/img/freeship-icon.svg';
import medicineImg from 'assets/img/medicine-img-01.png';
import presentGreenIcon from 'assets/img/present-green-icon.svg';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  const isPromo = product.discount !== 'No';
  const price = parseInt(product.price);
  let discountPercent;
  let priceAfterDiscount;
  if (isPromo && product) {
    discountPercent = parseInt(product.discount.slice(0, -1)) / 100;
    priceAfterDiscount = parseInt(price) - parseInt(price) * discountPercent;
  }

  return (
    <Link to={`/product/${product.id}`} className='product__item discount'>
      <div className='item__header'>
        {isPromo && (
          <span className='header__discount'>{product.discount}</span>
        )}
        <img
          className='header__product'
          src={product?.images[0].url || medicineImg}
          alt='medicine logo'
        />
        <img
          className='header__freeship'
          src={freeshipIcon}
          alt='freeship logo'
        />
        <img className='header__gift' src={presentGreenIcon} alt='gift logo' />
      </div>
      <div className='item__footer'>
        <h5>
          {product.name.length <= 40
            ? product.name
            : `${product.name.substring(0, 40)}...`}
        </h5>

        {isPromo && priceAfterDiscount ? (
          <p>{priceAfterDiscount.toLocaleString()} đ</p>
        ) : (
          <p>{price.toLocaleString()} đ</p>
        )}

        {isPromo && priceAfterDiscount && (
          <p className='footer__discount'>{price.toLocaleString()} đ</p>
        )}
      </div>
    </Link>
  );
}

export default ProductItem;
