import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../userSlice';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
function ModalAuth() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const dispatch = useDispatch();
  return (
    <div className='modal-auth'>
      <div onClick={() => dispatch(closeModal())} className='time-close'>
        X
      </div>
      <div className='header'>
        <div
          onClick={() => setMode(MODE.LOGIN)}
          className={`header__left ${mode === MODE.LOGIN ? 'active' : ''}`}
        >
          <h4>ĐĂNG NHẬP</h4>
          <p>Đã là thành viên Phanolink</p>
        </div>
        <div
          onClick={() => setMode(MODE.REGISTER)}
          className={`header__right ${mode === MODE.REGISTER ? 'active' : ''}`}
        >
          <h4>ĐĂNG KÝ</h4>
          <p>Dành cho khách hàng mới</p>
        </div>
      </div>
      <div className='content'>
        {mode === MODE.LOGIN ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default ModalAuth;
