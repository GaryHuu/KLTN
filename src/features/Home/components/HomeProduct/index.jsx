import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import productApi from 'api/productApi';
import iconHomeProduct from 'assets/img/icon-home-product.png';
import ProductList from 'features/Product/components/ProductList';

function HomeProduct(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data } = await productApi.getProductList();
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className='home-product'>
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
            <Skeleton
              className='skeleton product__item'
              containerClassName='skeleton-container home-product__list'
              count={20}
            />
          ) : (
            <ProductList data={productList} />
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeProduct;
