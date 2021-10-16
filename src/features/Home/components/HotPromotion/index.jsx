import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import productApi from 'api/productApi';
import iconHotPromotion from 'assets/img/icon-hot-promotion.svg';

function HotPromotion() {
  const [hotPromoList, setHotPromoList] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getHotPromo();
        setHotPromoList(data.slice(0, 9));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
            {hotPromoList.map((item) => (
              <Link
                key={item.id}
                className='hot-promotion__item'
                to={`/product/${item.id}`}
              >
                <img
                  style={{ height: '283px', objectFit: 'cover' }}
                  src={item.images[0].url}
                  alt=''
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default HotPromotion;
