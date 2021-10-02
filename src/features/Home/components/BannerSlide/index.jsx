import React from 'react';
import Slider from 'react-slick';
import bannerImg from 'assets/img/banner.png';

function BannerSlide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider className='slider' {...settings}>
      <div className='slider__item'>
        <img src={bannerImg} alt='' />
      </div>
      <div className='slider__item'>
        <img src={bannerImg} alt='' />
      </div>
      <div className='slider__item'>
        <img src={bannerImg} alt='' />
      </div>
    </Slider>
  );
}

export default BannerSlide;
