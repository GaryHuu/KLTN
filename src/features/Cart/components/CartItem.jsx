import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import product01 from 'assets/img/product1.jpg';
import Quantity from 'components/Quantity';

function CartItem(props) {
  const [count, setCount] = useState(props.count || 1);
  const handleButtonDeleteClick = () => {};
  const handleQuantityChange = (newValue) => {
    console.log(newValue);
    setCount(newValue);
  };
  return (
    <div className='item'>
      <Link to='/product/1'>
        <img src={product01} alt='' />
      </Link>
      <div className='item__info'>
        <div className='description'>
          <p>
            Thực Phẩm Chức Năng Viên Sủi Bổ Sung Vitamin Bocalex Multi Tuýp 20
            Viên
          </p>
          <span onClick={handleButtonDeleteClick}>Xóa</span>
        </div>
        <div className='price'>
          <p className='price__new'>800.000đ</p>
          <span className='price__discount'>-30%</span>
          <span className='price__old'>999.000đ</span>
        </div>
        <Quantity count={count} onChange={handleQuantityChange} />
      </div>
    </div>
  );
}

export default CartItem;
