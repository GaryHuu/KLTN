import { unwrapResult } from '@reduxjs/toolkit';
import { changeUserId } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModal, login } from '../userSlice';
import LoginForm from './LoginForm';

function Login() {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const res = unwrapResult(resultAction);
      if (res.user_id) {
        dispatch(closeModal());
        dispatch(changeUserId(res.user_id));
      }
      toast.success('Đặng Nhập Thành Công!');
    } catch (error) {
      toast.error('Tài Khoản Không Hợp Lệ!');
    }
  };
  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;
