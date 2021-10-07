import React from 'react';
import BannerIconHome from '../BannerIconHome.jsx';
import BannerSlide from '../BannerSlide';

function SlideHome() {
  return (
    <section className='banner-slide'>
      <div className='banner-slide__content container'>
        <BannerSlide />
        <BannerIconHome />
      </div>
    </section>
  );
}

export default SlideHome;
