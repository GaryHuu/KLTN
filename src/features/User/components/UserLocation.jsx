import React from 'react';
import UserLocationForm from './Informations/UserLocationForm';
import withLoading from 'components/HOC/withLoading';

function UserLocation({ hideLoading, showLoading }) {
  const handleSubmit = (values) => {
    // console.log(values);
  };
  return <UserLocationForm onSubmit={handleSubmit} />;
}

export default withLoading(UserLocation);
