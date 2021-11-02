import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function SidebarAdmin() {
  const location = useLocation();
  const history = useHistory();
  const sidebarList = useMemo(() => {
    return [
      {
        id: 1,
        iconClassName: 'fas fa-pills',
        title: 'Sản Phẩm',
        path: '/admin/products',
      },
      {
        id: 2,
        iconClassName: 'fas fa-file-invoice-dollar',
        title: 'Đơn hàng',
        path: '/admin/bills',
      },
      {
        id: 3,
        iconClassName: 'far fa-user',
        title: 'Người dùng',
        path: '/admin/users',
      },
    ];
  }, []);
  return (
    <div className='sidebar-admin'>
      <h4>Quản Lý</h4>
      <ul>
        {sidebarList.map((item) => (
          <li
            key={item.id}
            className={location.pathname.includes(item.path) ? 'active' : ''}
            onClick={() => {
              history.push(item.path)
            }}
          >
            <i className={item.iconClassName}></i>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarAdmin;
