import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBarUser(props) {
  const { pathname } = useLocation();

  const listTab = [
    {
      id: 1,
      path: '/user',
      search: '',
      title: 'Thông tin tài khoản',
      className: 'category-item',
    },
    {
      id: 2,
      path: '/user/location',
      search: '',
      title: 'Thông tin địa chỉ',
      className: 'category-item',
    },
    {
      id: 3,
      path: '/user/order',
      search: '?page=1&with=address,order_details.product.images&perPage=6',
      title: 'Quản lý đơn hàng',
      className: 'category-item',
    },
    {
      id: 4,
      path: '/user/favorite',
      search: '?page=1&perPage=8&with=product.images',
      title: 'Sản phẩm yêu thích',
      className: 'category-item',
    },
  ];


  return (
    <div className='side-bar-user'>
      <h5>Quản Lý Tài Khoản</h5>
      <ul>
        {listTab.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path + tab.search}
            className={pathname === tab.path ? `${tab.className} active` : tab.className}
          >
            {tab.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SideBarUser;
