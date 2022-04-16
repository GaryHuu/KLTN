import productApi from 'api/productApi';
import featureProductBanner from 'assets/img/feature-product-banner.png';
import iconFeatureProductBanner from 'assets/img/icon-feature-product.svg';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';

function FeatureProduct() {
  const [hotProductList, setHotProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const mouted = useRef(true);
  const isLoaded = useRef(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    mouted.current = true;
    if (!isLoaded.current && inView) {
      (async () => {
        setLoading(true);
        try {
          const { data } = await productApi.getHotProduct();
          if (mouted.current) setHotProductList(data);
        } catch (error) {
          // console.log(error);
        }
        setLoading(false);
      })();
      isLoaded.current = true;
    }
    return () => {
      mouted.current = false;
    };
  }, [inView]);

  return (
    <section ref={ref} className='feature-product'>
      <div className='container'>
        <div className='feature-product__content'>
          <div className='feature-product__top'>
            <img src={iconFeatureProductBanner} alt='' />
            <span className='feature-product__title'>Sản Phẩm Nổi Bật</span>
          </div>
          <div className='feature-product__main'>
            {loading ? (
              <Skeleton
                className='skeleton'
                containerClassName='slide-skeleton'
                count={4}
              />
            ) : (
              <Slider {...settings} className='feature-product__list'>
                <div className='feature-product__container'>
                  {hotProductList.slice(0, 4).map((product) => {
                    const url = product?.images[0]?.url;
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className='feature-product__item'
                      >
                        <img src={url} alt='' />
                      </Link>
                    );
                  })}
                </div>
                <div className='feature-product__container'>
                  {hotProductList.slice(4, 8).map((product) => {
                    const url = product?.images[0]?.url;
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className='feature-product__item'
                      >
                        <img src={url} alt='' />
                      </Link>
                    );
                  })}
                </div>
                <div className='feature-product__container'>
                  {hotProductList.slice(8, 12).map((product) => {
                    const url = product?.images[0]?.url;
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className='feature-product__item'
                      >
                        <img src={url} alt='' />
                      </Link>
                    );
                  })}
                </div>
                {/* <div className='feature-product__container'>
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
              </div> */}
              </Slider>
            )}
            {loading ? (
              <Skeleton
                className='skeleton'
                containerClassName='feature-product__banner'
              />
            ) : (
              <div className='feature-product__banner'>
                <img src={featureProductBanner} alt='' />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureProduct;
