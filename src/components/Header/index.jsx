import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import categoryApi from 'api/categoryApi';
import headerLogo from 'assets/img/header-logo.svg';
import userIcon from 'assets/img/user-icon.svg';
import ModalAuth from 'features/Auth/components/ModalAuth';
import { closeModal, logout, openModal } from 'features/Auth/userSlice';
import { logoutCart } from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const modalIsOpen = useSelector((state) => state.user.modalIsOpen);
  const user = useSelector((state) => state.user.current);
  const countCart = useSelector(cartItemsCountSelector);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await categoryApi.getCategories();
        setCategoryList(data);
      } catch (error) {}
    })();
  }, []);

  const handleButtonLoginLogoutClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      return;
    }
    const action = logout();
    dispatch(action);
    const actionCart = logoutCart();
    dispatch(actionCart);
    toast.success('Đã Đăng Xuất!');
    history.replace('/');
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
    history.replace(`/product?search=${inputSearch}`);
  };

  const handleCartClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng Nhập Để Xem Giỏ Hàng!');
      return;
    }
    history.push('/cart');
  };

  const handleUserClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng nhập để xem thông tin!');
      return;
    }
    history.push('/user');
  };

  const handleCategoryChange = (id) => {
    if(location.pathname + location.search === `/product?category=${id}`) return;
    history.push({
      pathname: '/product',
      search: `?category=${id}`,
    });
  };

  const handleAll = () => {
    if(location.pathname + location.search === '/product') return;
    history.push('/product');
  };

  return (
    <Fragment>
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
              <div onClick={handleAll}>Tất cả</div>
              {categoryList.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleCategoryChange(item.id)}
                >
                  {item.name}
                </div>
                // <Link key={item.id} to={`/product?category=${item.id}`}>
                //   {item.name}
                // </Link>
              ))}
            </div>
          </div>
          <div onClick={handleCartClick} className='header__cart'>
            <span className='cart__noti-number'>{countCart || 0}</span>
            <i className='fas fa-shopping-cart'></i>
            <p>Giỏ hàng</p>
          </div>
          <div className='header__user'>
            <img src={userIcon} alt='user logo' />
            <div className='user-log'>
              <div onClick={handleButtonLoginLogoutClick}>
                {!user ? 'Đăng Nhập' : 'Đăng Xuất'}
              </div>
              <div onClick={handleUserClick}>
                {!user ? 'Tài khoản' : user?.name?.split(' ')?.pop()}
              </div>
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
    </Fragment>
  );
}

export default Header;
