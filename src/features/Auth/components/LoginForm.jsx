import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import { toast } from 'react-toastify';

function LoginForm(props) {
  const { onSubmit } = props;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),

    password: yup.string().required('Please enter your password').min(6),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };

  return (
    <div className='section-login'>
      <h3 className='section-login__title'>Đăng Nhập</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          placeholder='Nhập email hoặc số điện thoại'
          name='email'
          form={form}
          label='Email / SĐT'
        />
        <PasswordField
          placeholder='Mật khẩu từ 6 đến 32 ký tự'
          name='password'
          form={form}
          label='Mật Khẩu'
        />
        <p className='forget-password'>
          Quên mật khẩu? Nhấn vào
          <strong
            onClick={() => {
              toast.warn('Chức năng đang phát triển!');
            }}
          >
            {' '}
            đây
          </strong>
        </p>
        <button className='button-submit' type='submit'>
          Đăng nhập
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            toast.warn('Chức năng đang phát triển!');
          }}
          className='button-submit button-submit--fb'
        >
          Đăng nhập bằng Facebook
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            toast.warn('Chức năng đang phát triển!');
          }}
          className='button-submit button-submit--gg'
        >
          Đăng nhập bằng Google
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
