import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import bannerImg from 'assets/img/banner.png';
import productApi from 'api/productApi';
import { useInView } from "react-intersection-observer";
import { useRef } from 'react';

function BannerSlide() {
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoaded = useRef(false);
  const [ref, inView] = useInView({
    threshold: 0
  });

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if(!isLoaded.current && inView) { 
      (async () => {
        setLoading(true);
        try {
          const { data } = await productApi.getBanners();
          setBannerList(data);
          setLoading(false);
        } catch (error) {
          // console.log(error);
          setLoading(false);
        }
      })();
      isLoaded.current = true;
    }
  }, [inView]);
  return (
    <div ref={ref}>
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
    </div>
  );
}

export default BannerSlide;
