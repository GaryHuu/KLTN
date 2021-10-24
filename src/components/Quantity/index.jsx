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
      <input
        onChange={(e) => onChange(e.target.value)}
        type='number'
        value={count}
      />
      {/* <span>{count}</span> */}
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
