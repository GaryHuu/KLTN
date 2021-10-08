import ProductList from 'features/Product/components/ProductList';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useRouteMatch } from 'react-router';
function FavoriteProduct(props) {
  const match = useRouteMatch();
  console.log(match);
  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    console.log(currentPage);
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
