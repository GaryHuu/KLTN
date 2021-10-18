import React from 'react';

function Skeleton(props) {
  return (
    <div
      className={props.className}
      style={{
        width: `${props.width}`,
        height: `${props.height}`,
        backgroundColor: 'red',
      }}
    ></div>
  );
}

export default Skeleton;
