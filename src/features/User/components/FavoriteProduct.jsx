import React from 'react';
import ReactPaginate from 'react-paginate';

import ProductList from 'features/Product/components/ProductList';

function FavoriteProduct(props) {
  const handlePageClick = (e) => {
    // const currentPage = e.selected + 1;
    // console.log(currentPage);
  };
  return (
    <div className='favorite-product'>
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
    </div>
  );
}

export default FavoriteProduct;
