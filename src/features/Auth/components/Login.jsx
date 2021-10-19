import { unwrapResult } from '@reduxjs/toolkit';
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
      dispatch(closeModal());
      unwrapResult(resultAction);
      toast.success('Đặng Nhập Thành Công!');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;
