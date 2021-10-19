import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'components/form-controls/Button';
import GenderField from 'components/form-controls/GenderField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';

function UserInformationForm(props) {
  const { onSubmit } = props;
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    phone: yup.string().required('Please enter your phone number').min(10),
    gender: yup.string().required('Please enter your sex'),
    birthday: yup.string().required('Please enter your birthday'),
    isChangePassword: yup.boolean(),
    old_password: yup.string().required('Please enter your password'),

    newPassword: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().required('Please enter your new password'),
    }),
    retypeNewPassword: yup
      .string()
      .when('isChangePassword', {
        is: true,
        then: yup.string().required('Please retype your new password'),
      })
      .oneOf([yup.ref('newPassword')], 'New password does not match'),
  });

  const form = useForm({
    defaultValues: {
      name: 'Nguyễn Hồng Hữu',
      email: 'honghuu.nguyen@gumiviet.com',
      phone: '0379339693',
      gender: '1',
      birthday: '2021-08-22',
      isChangePassword: false,
      old_password: undefined,
      newPassword: undefined,
      retypeNewPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='user-information'
    >
      <div className='left'>
        <InputField name='name' form={form} label='Họ Tên' />
        <InputField name='email' form={form} label='Email' />
        <InputField name='phone' form={form} label='Số điện thoại' />
        <GenderField name='gender' form={form} label='Giới tính' />
        <InputField name='birthday' type='date' form={form} label='Ngày Sinh' />
      </div>
      <div className='right'>
        <InputField
          type='checkbox'
          name='isChangePassword'
          form={form}
          label='Thay đổi mật khẩu'
        />
        <PasswordField
          name='old_password'
          form={form}
          label='Mật khẩu cũ'
          placeholder='Nhập mật khẩu cũ'
        />
        <PasswordField
          name='newPassword'
          form={form}
          label='Mật khẩu mới'
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
        />
        <PasswordField
          name='retypeNewPassword'
          form={form}
          label='Xác nhận mật khẩu mới'
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
        />
      </div>
      <Button type='submit' className='submit'>
        CẬP NHẬT THAY ĐỔI
      </Button>
    </form>
  );
}

export default UserInformationForm;
