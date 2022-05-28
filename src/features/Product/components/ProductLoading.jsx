import SkeletonProduct from 'components/SkeletonProduct';
import React from 'react';

function ProductLoading(props) {
  return (
    <div className='product-page'>
      <SkeletonProduct key={new Date()} />
    </div>
  );
}

export default ProductLoading;
