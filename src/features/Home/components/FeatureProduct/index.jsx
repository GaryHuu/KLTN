import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import featureProduct from 'assets/img/feature-product-img.png';
import featureProductBanner from 'assets/img/feature-product-banner.png';
import iconFeatureProductBanner from 'assets/img/icon-feature-product.svg';

function FeatureProduct() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className='feature-product'>
      <div className='container'>
        <div className='feature-product__content'>
          <div className='feature-product__top'>
            <img src={iconFeatureProductBanner} alt='' />
            <span className='feature-product__title'>Sản Phẩm Nổi Bật</span>
          </div>
          <div className='feature-product__main'>
            <Slider {...settings} className='feature-product__list'>
              <div className='feature-product__container'>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
              </div>
              <div className='feature-product__container'>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
              </div>
              <div className='feature-product__container'>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
                <Link to='/product' className='feature-product__item'>
                  <img src={featureProduct} alt='' />
                </Link>
              </div>
            </Slider>
            <div className='feature-product__banner'>
              <img src={featureProductBanner} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureProduct;
