import React, { useState } from 'react';
import ProductConent from './ProductConent';
import ProductHeader from './ProductHeader';

function AdminProduct(props) {
  const [refresh, doRefresh] = useState(0);
  
  const handleReload = () => {
    doRefresh(prev => prev + 1);
  }


  return (
    <div className='product-admin'>
      <ProductHeader reload={handleReload} />
      <ProductConent refresh={refresh} />
    </div>
  );
}

export default AdminProduct;
