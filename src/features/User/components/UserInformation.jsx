import React from 'react';
import UserInformationForm from './Informations/UserInformationForm';

function UserInformation(props) {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return <UserInformationForm onSubmit={handleSubmit} />;
}

export default UserInformation;
