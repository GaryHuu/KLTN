import SkeletonProduct from 'components/SkeletonProduct';
import React from 'react';

function ProductLoading(props) {
  return (
    <div className='product-page'>
      <SkeletonProduct />
    </div>
  );
}

export default ProductLoading;
