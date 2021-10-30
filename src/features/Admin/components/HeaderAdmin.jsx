import React from 'react';
import headerLogo from 'assets/img/header-logo.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../adminSlice';
import { toast } from 'react-toastify';

function HeaderAdmin() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    toast.success('Đăng xuất thàng công');
    dispatch(logout())
  }
  return (
    <header className='header-admin'>
      <div className='container'>
        <div className='header-content'>
          <div className='header-img'>
            <img src={headerLogo} alt='' />
          </div>
          <h1 className='title'>Admin</h1>
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
