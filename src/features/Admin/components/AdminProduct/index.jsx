import React, { useState } from 'react';
import ProductConent from './ProductConent';
import ProductHeader from './ProductHeader';

function AdminProduct(props) {
  const [refresh, doRefresh] = useState(0);
  
  const handleReload = () => {
    doRefresh(prev => prev + 1);
  }

  const handleOnSearch = () => {

  }

  return (
    <div className='product-admin'>
      <ProductHeader onSearch={handleOnSearch} reload={handleReload} />
      <ProductConent refresh={refresh} />
    </div>
  );
}

export default AdminProduct;
