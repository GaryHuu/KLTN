import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonProduct({ count = 20 }) {
  return (
    <div className='skeleton-container'>
      {new Array(count).fill(undefined).map((item, index) => (
        <div className='skeleton product__item'>
          <Skeleton key={1} containerClassName='product-img' />
          <Skeleton key={2} containerClassName='product-name' />
          <Skeleton key={3} containerClassName='product-name name-line-2' />
          <Skeleton key={4} containerClassName='product-name name-line-3' />
          <Skeleton key={5} containerClassName='product-name name-line-4' />
        </div>
      ))}
    </div>
  );
}

export default SkeletonProduct;
