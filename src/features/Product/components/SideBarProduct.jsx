import React from 'react';
import { Link } from 'react-router-dom';

function SideBarProduct(props) {
  return (
    <div className='side-bar-product'>
      <h5>Danh Mục Sản Phẩm</h5>
      <ul>
        <Link to='/product' className='category-item active'>
          Tất cả
        </Link>
        <Link to='/product' className='category-item'>
          Mẹ & bé
        </Link>
        <Link to='/product' className='category-item'>
          Thực phẩm chức năng
        </Link>
        <Link to='/product' className='category-item'>
          Chăm sóc cá nhân
        </Link>
        <Link to='/product' className='category-item'>
          Chăm sóc sức khỏe
        </Link>
        <Link to='/product' className='category-item'>
          Tủ thuốc gia đình
        </Link>
        <Link to='/product' className='category-item'>
          Chăm sóc phụ nữ
        </Link>
        <Link to='/product' className='category-item'>
          Chăm sóc sắc đẹp
        </Link>
        <Link to='/product' className='category-item'>
          Sức khỏe giới tính
        </Link>
      </ul>
    </div>
  );
}

export default SideBarProduct;
