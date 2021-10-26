import React from 'react';
import RegisterForm from './RegisterForm';
import { register } from 'features/Auth/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MODE } from './ModalAuth';
import withLoading from 'components/HOC/withLoading';

function Register(props) {
  const { setMode, showLoading, hideLoading } = props;
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    showLoading();
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success('Đặng Ký Thành Công!');
      setMode(MODE.LOGIN);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    hideLoading();
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}

export default withLoading(Register);
