import React from 'react';
import RegisterForm from './RegisterForm';

function Register(props) {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
