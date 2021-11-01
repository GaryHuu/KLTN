import userApi from 'api/userApi';
import withLoading from 'components/HOC/withLoading';
import { StorageKeys } from 'constant';
import { change } from 'features/Auth/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import UserInformationForm from './Informations/UserInformationForm';

function UserInformation({ hideLoading, showLoading }) {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  // const currentToken = useSelector(state => state.user.current?.access_token); 
  // console.log(currentToken);

  useEffect(() => {
    (async function () {
      showLoading();
      try {
        const { data } = await userApi.getProfile();
        setUser(data);
      } catch (error) {
        // console.log(error);
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
    showLoading();
    try {
      const { data } = await userApi.updateProfile(newData);
      setUser(data[0]);
      const user = {
        name: data[0].name,
        id: data[0].id,
        access_token: localStorage.getItem(StorageKeys.TOKEN),
      };
      const action = change(user);
      dispatch(action);
      toast.success('Cập nhật thành công!');
    } catch (error) {
      toast.error('Cập nhật thất bại!');
    }
    hideLoading();
  };

  return <UserInformationForm user={user} onSubmit={handleSubmit} />;
}

export default withLoading(UserInformation);
