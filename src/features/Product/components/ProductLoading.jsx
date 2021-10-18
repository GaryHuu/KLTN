import React from 'react';

function ProductLoading(props) {
  const BGCOLOR = '#CCC';
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '1930px',
          marginTop: '20px',
          backgroundColor: BGCOLOR,
        }}
      ></div>
      <div
        style={{
          width: '271px',
          height: '25px',
          marginTop: '12px',
          paddingRight: '10px',
          float: 'right',
          backgroundColor: BGCOLOR,
        }}
      ></div>
    </>
  );
}

export default ProductLoading;
