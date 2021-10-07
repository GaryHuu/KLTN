import React from 'react';

import BannerSlide from 'features/Home/components/BannerSlide';

import ProductList from '../components/ProductList';
import ProductPromotion from '../components/ProductPromotion';
import SideBarProduct from '../components/SideBarProduct';
import ProductFilter from '../components/ProductFilter';
import ReactPaginate from 'react-paginate';
import ProductNotFound from './ProductNotFound';

function ProductPage() {
  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    console.log(currentPage);
  };

  const iSNotFoundProduct = false;

  return (
    <div className='product-page'>
      <div className='container'>
        <div className='product-page__content'>
          <div className='product-page__left'>
            <SideBarProduct />
            <ProductPromotion />
          </div>
          <div className='product-page__right'>
            {iSNotFoundProduct ? (
              <ProductNotFound />
            ) : (
              <>
                <BannerSlide />
                <ProductFilter />
                <ProductList />
                <ReactPaginate
                  initialPage={0}
                  pageCount={10}
                  onPageChange={handlePageClick}
                  activeClassName='active'
                  containerClassName='product-pagi'
                  nextLabel='>'
                  previousLabel='<'
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
