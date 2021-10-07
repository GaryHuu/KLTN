import React from 'react';
import LoginForm from './LoginForm';

function Login() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;
