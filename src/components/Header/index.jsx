import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import headerLogo from 'assets/img/header-logo.svg';
import userIcon from 'assets/img/user-icon.svg';
import ModalAuth from 'features/Auth/components/ModalAuth';
import { closeModal, openModal } from 'features/Auth/userSlice';
import { toast } from 'react-toastify';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const modalIsOpen = useSelector((state) => state.user.modalIsOpen);
  const isLoggedIn = true;

  const handleOpenModal = () => {
    const action = openModal();
    dispatch(action);
  };
  const handleCloseModal = () => {
    const action = closeModal();
    dispatch(action);
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputSearch(inputValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng nhập để xem giỏ hàng!');
      return;
    }
    history.push('/cart');
  };

  const handleUserClick = () => {
    if (!isLoggedIn) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng nhập để xem thông tin!');
      return;
    }
    history.push('/user');
  };
  return (
    <>
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
          <div onClick={handleCartClick} className='header__cart'>
            <span className='cart__noti-number'>69</span>
            <i className='fas fa-shopping-cart'></i>
            <p>Giỏ hàng</p>
          </div>
          <div className='header__user'>
            <img src={userIcon} alt='user logo' />
            <div className='user-log'>
              <div onClick={handleOpenModal}>Đăng nhập</div>
              <div onClick={handleUserClick}>Tài khoản</div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            zIndex: '1000',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.53)',
            cursor: 'poiter',
          },
          content: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: 'rgb(255, 255, 255)',
            overflow: 'unset',
            borderRadius: '4px',
            outline: 'none',
            padding: '0',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <ModalAuth />
      </Modal>
    </>
  );
}

export default Header;
