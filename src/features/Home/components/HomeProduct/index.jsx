import React from 'react';
import { Link } from 'react-router-dom';

// import discountICon from 'assets/img/discount-icon.svg';
// import freeshipIcon from 'assets/img/freeship-icon.svg';
// import medicineImg from 'assets/img/medicine-img-01.png';
// import medicineImg02 from 'assets/img/medicine-img-02.png';
// import medicineImg03 from 'assets/img/medicine-img-03.png';
// import medicineImg04 from 'assets/img/medicine-img-04.png';
// import medicineImg05 from 'assets/img/medicine-img-05.png';
// import presentGreenIcon from 'assets/img/present-green-icon.svg';
import iconHomeProduct from 'assets/img/icon-home-product.png';
import ProductList from 'features/Product/components/ProductList';

function HomeProduct(props) {
  return (
    <section className='home-product'>
      <div className='container'>
        <div className='home-product__content'>
          <div className='home-product__top'>
            <div className='home-product__title'>
              <img src={iconHomeProduct} alt='' />
              <span>Sản Phẩm</span>
            </div>
            <Link to='/product' className='see-all'>
              Xem tất cả &nbsp; &gt;
            </Link>
          </div>
          <ProductList />
        </div>
      </div>
    </section>
  );
}

export default HomeProduct;
