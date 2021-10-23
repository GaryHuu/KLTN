import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import productApi from 'api/productApi';
import iconHotPromotion from 'assets/img/icon-hot-promotion.svg';
import Skeleton from 'react-loading-skeleton';

function HotPromotion() {
  const [hotPromoList, setHotPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await productApi.getHotPromo();
        setHotPromoList(data.slice(0, 9));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
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
            <Link to='/product?sort-by-sale=true' className='see-all'>
              Xem tất cả &nbsp; &gt;
            </Link>
          </div>
          {loading ? (
            <Skeleton
              className='skeleton'
              containerClassName='slide-skeleton'
              count={3}
            />
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}

export default HotPromotion;
