import React from 'react';

function Quantity({ count, onChange }) {
  return (
    <div className='quantity'>
      <button
        disabled={count <= 1 ? true : false}
        onClick={() => {
          onChange(count - 1);
        }}
      >
        -
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          onChange(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
