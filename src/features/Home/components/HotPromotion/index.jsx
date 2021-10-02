import React from 'react';
import iconHotPromotion from 'assets/img/icon-hot-promotion.svg';
import hotPromotionItem01 from 'assets/img/hot-promotion-item-01.png';
import hotPromotionItem03 from 'assets/img/hot-promotion-item-03.png';
import hotPromotionItem02 from 'assets/img/hot-promotion-item-02.png';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function HotPromotion() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <section className='hot-promotion'>
      <div className='container'>
        <div className='hot-promotion__content'>
          <div className='hot-promotion__top'>
            <div className='hot-promotion__title'>
              <img src={iconHotPromotion} alt='' />
              <span>Khuyễn Mãi Hot</span>
            </div>
            <Link to='/product' className='see-all'>
              Xem tất cả &nbsp; &gt;
            </Link>
          </div>
          <Slider {...settings} className='hot-promotion__list'>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem01} alt='' />
            </Link>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem01} alt='' />
            </Link>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem01} alt='' />
            </Link>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem01} alt='' />
            </Link>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem03} alt='' />
            </Link>
            <Link className='hot-promotion__item' to='/product'>
              <img src={hotPromotionItem02} alt='' />
            </Link>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default HotPromotion;
