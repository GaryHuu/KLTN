import productApi from 'api/productApi';
import iconHomeProduct from 'assets/img/icon-home-product.png';
import SkeletonProduct from 'components/SkeletonProduct';
import ProductList from 'features/Product/components/ProductList';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function HomeProduct(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const mouted = useRef(true);
  const isLoaded = useRef(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    mouted.current = true;
    if (!isLoaded.current && inView) {
      (async function () {
        setLoading(true);
        try {
          const { data } = await productApi.getProductList();
          if (mouted.current) setProductList(data);
        } catch (error) {
          // console.log(error);
        }
        setLoading(false);
      })();
      isLoaded.current = true;
    }
    return () => {
      mouted.current = false;
      // console.log(mouted.current);
    };
  }, [inView]);

  return (
    <section ref={ref} className='home-product'>
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
          {loading ? (
            <SkeletonProduct key={'a'} count={20}/>
          ) : (
            <ProductList data={productList} />
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeProduct;
