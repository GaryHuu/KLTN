import React from 'react';
import { Fragment } from 'react';
import ProductConent from './ProductConent';
import ProductHeader from './ProductHeader';

function AdminProduct(props) {
  return (
    <Fragment>
      <ProductHeader/>
      <ProductConent/>
    </Fragment>
  );
}

export default AdminProduct;