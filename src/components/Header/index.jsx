import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import headerLogo from 'assets/img/header-logo.svg';
import userIcon from 'assets/img/user-icon.svg';
import Modal from 'react-modal/lib/components/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from 'features/Auth/userSlice';

function Header() {
  const [inputSearch, setInputSearch] = useState('');
  const modalIsOpen = useSelector((state) => state.user.modalIsOpen);
  const dispatch = useDispatch();
  console.log(modalIsOpen);
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
    console.log(inputSearch);
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
          <Link to='/cart' className='header__cart'>
            <span className='cart__noti-number'>69</span>
            <i className='fas fa-shopping-cart'></i>
            <p>Giỏ hàng</p>
          </Link>
          <div className='header__user'>
            <img src={userIcon} alt='user logo' />
            <div className='user-log'>
              <div onClick={handleOpenModal}>Đăng nhập</div>
              <div>Tài khoản</div>
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
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: '1px solid rgb(204, 204, 204)',
            background: 'rgb(255, 255, 255)',
            overflow: 'auto',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h1 id='heading'>Alert</h1>
        <div id='full_description'>
          <p>Description goes here.</p>
        </div>
      </Modal>
    </>
  );
}

export default Header;
