import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import GenderField from 'components/form-controls/GenderField';
import InputField from 'components/form-controls/InputField';

function UserInformationForm(props) {
  const { onSubmit } = props;
  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    phoneNumber: yup.string().required('Please enter your phone number'),
    gender: yup.string().required('Please enter your sex'),
    birthday: yup.string().required('Please enter your birthday'),
    isChangePassword: yup.boolean(),
    oldPassword: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().required('Please enter your password'),
    }),
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
      fullName: 'Nguyễn Hồng Hữu',
      email: 'honghuu.nguyen@gumiviet.com',
      phoneNumber: '0379339693',
      gender: 'male',
      birthday: '2021-08-22',
      isChangePassword: false,
      oldPassword: undefined,
      newPassword: undefined,
      retypeNewPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // if (!onSubmit) return;
    // onSubmit(values);
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='user-information'
    >
      <div className='left'>
        <InputField name='fullName' form={form} label='Họ Tên' />
        <InputField name='email' form={form} label='Email' />
        <InputField name='phoneNumber' form={form} label='Số điện thoại' />
        <GenderField name='gender' form={form} label='Giới tính' />
        <InputField type='date' name='birthday' form={form} label='Ngày Sinh' />
      </div>
      <div className='right'>
        <InputField
          type='checkbox'
          name='isChangePassword'
          form={form}
          label='Thay đổi mật khẩu'
        />
        <InputField
          name='oldPassword'
          form={form}
          label='Họ Mật khẩu cũ'
          placeholder='Nhập mật khẩu cũ'
        />
        <InputField
          name='newPassword'
          form={form}
          label='Mật khẩu mới'
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
        />
        <InputField
          name='retypeNewPassword'
          form={form}
          label='Xác nhận mật khẩu mới'
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
        />
      </div>
      <button type='submit' className='submit'>
        CẬP NHẬT THAY ĐỔI
      </button>
    </form>
  );
}

export default UserInformationForm;
