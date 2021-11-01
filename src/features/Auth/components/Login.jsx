import { unwrapResult } from '@reduxjs/toolkit';
import withLoading from 'components/HOC/withLoading';
import { changeUserId } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModal, login } from '../userSlice';
import LoginForm from './LoginForm';

function Login({showLoading, hideLoading}) {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    showLoading();
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const res = unwrapResult(resultAction);
      if (res.user_id) {
        dispatch(closeModal());
        dispatch(changeUserId(res.user_id));
      }
      toast.success('Đặng nhập thành công!');
    } catch (error) {
      toast.error('Tài khoản không hợp lệ!');
    }
    hideLoading();
  };
  return <LoginForm onSubmit={handleSubmit} />;
}

export default withLoading(Login);
