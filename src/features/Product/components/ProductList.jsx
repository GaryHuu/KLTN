import React from 'react';

import ProductItem from './ProductItem';

function ProductList({ data }) {
  return (
    <div className='home-product__list'>
      {data?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
