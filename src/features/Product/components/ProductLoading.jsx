import React from 'react';
import Skeleton from 'react-loading-skeleton';

function ProductLoading(props) {
  return (
    <div>
      <Skeleton
        className='skeleton product__item'
        containerClassName='skeleton-container home-product__list'
        count={props.count || 20}
      />

      <Skeleton
        count={1}
        width={150}
        height={25}
        style={{
          marginTop: 10,
          border: '2px solid #fff',
          float: 'right',
        }}
      />
    </div>
  );
}

export default ProductLoading;
