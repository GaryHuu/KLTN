import discountICon from 'assets/img/discount-icon.svg';
import freeshipIcon from 'assets/img/freeship-icon.svg';
import medicineImg from 'assets/img/medicine-img-01.png';
import presentGreenIcon from 'assets/img/present-green-icon.svg';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem(props) {
  const id = props.id || 1;
  return (
    <Link to={`/product/${id}`} className='product__item discount'>
      <div className='item__header'>
        <img
          className='header__discount'
          src={discountICon}
          alt='discount logo'
        />
        <img
          className='header__product'
          src={medicineImg}
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
        <h5>Thực Phẩm Chức Năng Bổ Não Giảm Triệu Chứng.....</h5>
        <p>800.000đ</p>
        <p className='footer__discount'>999.000đ</p>
      </div>
    </Link>
  );
}

export default ProductItem;
