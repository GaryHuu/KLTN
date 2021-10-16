import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import bannerImg from 'assets/img/banner.png';
import productApi from 'api/productApi';

function BannerSlide() {
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await productApi.getBanners();
        setBannerList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Slider className='slider' {...settings}>
      <div className='slider__item'>
        <img src={bannerImg} alt='' />
      </div>
      {bannerList.map((item) => (
        <div key={item?.name} className='slider__item'>
          <img src={item?.image?.url} alt='' />
        </div>
      ))}
    </Slider>
  );
}

export default BannerSlide;
