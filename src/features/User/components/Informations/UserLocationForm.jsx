import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';
import Button from 'components/form-controls/Button';

function UserLocationForm({ onSubmit }) {
  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    phoneNumber: yup.string().required('Please enter your phone number'),
    province: yup.string().required('Please enter your provice'),
    district: yup.string().required('Please enter your district'),
    subDistrict: yup.string().required('Please enter your sub district'),
    location: yup.string().required('Please enter your location'),
  });

  const form = useForm({
    defaultValues: {
      fullName: 'Nguyễn Hồng Hữu',
      email: 'honghuu.nguyen@gumiviet.com',
      phoneNumber: '0379339693',
      province: 'TP Hồ Chí Minh',
      district: 'Quận 9',
      subDistrict: 'Tăng Nhơn Phú A',
      location: '15/244 Đường Man Thiện',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='user-location'>
      <InputField name='fullName' form={form} label='Họ Tên' />
      <InputField name='email' form={form} label='Email' />
      <InputField name='phoneNumber' form={form} label='Số điện thoại' />
      <InputField name='province' form={form} label='Tỉnh' />
      <InputField name='district' form={form} label='Quận / Huyện' />
      <InputField name='subDistrict' form={form} label='Phường / Xã' />
      <TextAreaField name='location' form={form} label='Địa Chỉ' />
      <Button type='submit' className='submit'>
        CẬP NHẬT THAY ĐỔI
      </Button>
    </form>
  );
}

export default UserLocationForm;
