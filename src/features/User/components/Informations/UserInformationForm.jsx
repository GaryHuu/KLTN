import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'components/form-controls/Button';
import GenderField from 'components/form-controls/GenderField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';

function UserInformationForm(props) {
  const { user, onSubmit } = props;
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    phone: yup
      .string()
      .required('Please enter your phone number')
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Phone number is not valid'),
    gender: yup
      .number()
      .required('Please enter your phone gender')
      .typeError('Please enter your phone gender'),
    birthday: yup
      .string()
      .required('Please enter your phone birthday')
      .typeError('Please enter your phone birthday'),
    isChangePassword: yup.boolean(),
    old_password: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().required('Please enter your password').min(6),
    }),
    new_password: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().required('Please enter your new password').min(6),
    }),
    new_password_confirmation: yup
      .string()
      .when('isChangePassword', {
        is: true,
        then: yup.string().required('Please retype your new password').min(6),
      })
      .oneOf([yup.ref('new_password')], 'New password does not match'),
  });

  const form = useForm({
    defaultValues: {
      // isChangePassword: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    user &&
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        birthday: user.birthday,
        isChangePassword: false,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          label='Mật khẩu'
          placeholder='Nhập mật khẩu'
        />
        <PasswordField
          name='new_password'
          form={form}
          label='Mật khẩu mới'
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
        />
        <PasswordField
          name='new_password_confirmation'
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
