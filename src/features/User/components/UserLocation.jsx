import React from 'react';
import UserLocationForm from './Informations/UserLocationForm';

function UserLocation(props) {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return <UserLocationForm onSubmit={handleSubmit} />;
}

export default UserLocation;
