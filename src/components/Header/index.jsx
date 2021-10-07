import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import headerLogo from 'assets/img/header-logo.svg';
import userIcon from 'assets/img/user-icon.svg';

function Header() {
  const [inputSearch, setInputSearch] = useState('');
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputSearch(inputValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputSearch);
  };
  return (
    <header>
      <div className='header container'>
        <Link to='/' className='header__logo'>
          <img src={headerLogo} alt='' />
        </Link>
        <div className='header__search'>
          <form onSubmit={handleSubmit} className='header__search-main'>
            <input
              onChange={handleInputChange}
              value={inputSearch}
              type='text'
              placeholder='Bạn đang tìm thuốc gì...'
            />
            <button type='submit'>
              <i className='fas fa-search'></i>
              Tìm kiếm
            </button>
          </form>
          <div className='header__search-product'>
            <Link to='/product'>Mẹ &amp; bé</Link>
            <Link to='/product'>Thực phẩm chức năng</Link>
            <Link to='/product'>Chăm sóc cá nhân</Link>
            <Link to='/product'>Chăm sóc sức khỏe</Link>
            <Link to='/product'>Tủ thuốc gia đình</Link>
            <Link to='/product'>Chăm sóc phụ nữ</Link>
            <Link to='/product'>Chăm sóc sắc đẹp</Link>
            <Link to='/product'>Sức khỏe giới tính</Link>
          </div>
        </div>
        <Link to='/cart' className='header__cart'>
          <span className='cart__noti-number'>69</span>
          <i className='fas fa-shopping-cart'></i>
          <p>Giỏ hàng</p>
        </Link>
        <div className='header__user'>
          <img src={userIcon} alt='user logo' />
          <div className='user-log'>
            <div>Đăng nhập</div>
            <div>Tài khoản</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
