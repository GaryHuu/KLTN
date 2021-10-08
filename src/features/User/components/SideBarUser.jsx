import React from 'react';
import { Link } from 'react-router-dom';

function SideBarUser(props) {
  return (
    <div className='side-bar-user'>
      <h5>Quản Lý Tài Khoản</h5>
      <ul>
        <Link to='/user' className='category-item active'>
          Thông tin tài khoản
        </Link>
        <Link to='/user/location' className='category-item'>
          Địa chỉ
        </Link>
        <Link to='/user' className='category-item'>
          Quản lý đơn hàng
        </Link>
        <Link to='/user/favorite' className='category-item'>
          Sản phẩm yêu thích
        </Link>
      </ul>
    </div>
  );
}

export default SideBarUser;
