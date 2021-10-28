import React from 'react';
import AdminLoginForm from './AdminLoginForm';
import withLoading from 'components/HOC/withLoading';
import { useDispatch } from 'react-redux';
import { login } from '../adminSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function AdminLogin (props) {
  const {showLoading, hideLoading} = props;
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    showLoading();
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success('Đặng Nhập Thành Công!');
    } catch (error) {
      toast.error('Tài Khoản Không Hợp Lệ!');
    }
    hideLoading();
  };
  return (
    <AdminLoginForm onSubmit={handleSubmit}/>
  );
}

export default withLoading(AdminLogin);