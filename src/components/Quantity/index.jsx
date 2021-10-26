import React from 'react';

function Quantity({ count, onChange }) {
  const countInt = parseInt(count);
  return (
    <div className='quantity'>
      <button
        disabled={countInt <= 1 ? true : false}
        onClick={() => {
          onChange(countInt - 1);
        }}
      >
        -
      </button>
      <input
        onChange={(e) => {
          const value = parseInt(e.target.value)
          if (value <= 0 || !value) return onChange(countInt)
          return onChange(value)
        }
        } 
        type='number'
        value={countInt}
      />
      <button
        onClick={() => {
          onChange(countInt + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
