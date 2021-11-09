import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonProduct({ count = 20 }) {
  return (
    <div className='skeleton-container'>
      {new Array(count).fill(undefined).map((item, index) => (
        <div className='skeleton product__item'>
          <Skeleton containerClassName='product-img' />
          <Skeleton containerClassName='product-name' />
          <Skeleton containerClassName='product-name name-line-2' />
          <Skeleton containerClassName='product-name name-line-3' />
          <Skeleton containerClassName='product-name name-line-4' />
        </div>
      ))}
    </div>
  );
}

export default SkeletonProduct;
