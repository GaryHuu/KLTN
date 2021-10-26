import userApi from 'api/userApi';
import withLoading from 'components/HOC/withLoading';
import { change } from 'features/Auth/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import UserInformationForm from './Informations/UserInformationForm';

function UserInformation({ hideLoading, showLoading }) {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      showLoading();
      try {
        const { data } = await userApi.getProfile();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
      hideLoading();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values) => {
    let newData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      birthday: values.birthday,
      gender: values.gender,
      isChangePassword: false,
    };

    if (values.isChangePassword) {
      newData = { ...values };
    }

    try {
      const { data } = await userApi.updateProfile(newData);
      setUser(data[0]);
      const user = {
        name: data[0].name,
        id: data[0].id,
      };
      const action = change(user);
      dispatch(action);
      toast.success('Cập Nhật Thành Công!');
    } catch (error) {
      toast.error('Cập Nhật Thất Bại!');
    }
  };

  return <UserInformationForm user={user} onSubmit={handleSubmit} />;
}

export default withLoading(UserInformation);
