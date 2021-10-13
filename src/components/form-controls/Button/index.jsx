import React from 'react';

function Button(props) {
  const { type = 'submit', className = 'submit' } = props;
  return (
    <button type={type} className={className}>
      {props.children}
    </button>
  );
}

export default Button;
