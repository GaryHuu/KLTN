import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function AdminLoginForm(props) {
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

  const styles = {
    root:  {
      height: 'calc(100vh + 100px)',
      overflow: 'hidden',
      width: '100wh',
      backgroundColor: '#e7eff6',
      margin: '-100px 0',
      zIndex: 999,
      position: 'relative',
    },
    content:  {
      position: 'absolute',
      height: '500px',
      width: '500px',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }
  }

  return (
   <div style={styles.root}>
      <div className='section-login' style={styles.content}>
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
        <button className='button-submit' type='submit'>
          Đăng nhập
        </button>
      </form>
    </div>
   </div>
  );
}

export default AdminLoginForm;
