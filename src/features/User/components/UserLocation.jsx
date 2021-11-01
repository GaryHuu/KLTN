import userApi from 'api/userApi';
import withLoading from 'components/HOC/withLoading';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserLocationForm from './Informations/UserLocationForm';
import { useDispatch } from 'react-redux';
import { addAddressId } from 'features/Auth/userSlice';

function UserLocation({ hideLoading, showLoading }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    province: '',
    district: '',
    ward: '',
    street_name: '',
  });
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const formatData = (data) => {
    if (!data) return;
    const newInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    setInfo(newInfo);

    if(data.address) {
      const newAddress = {
        province: data.address.province,
        district: data.address.district,
        ward: data.address.ward,
        street_name: data.address.street_name,
      };
      setAddress(newAddress);
    }
  };

  const fetchUserLocation = async () => {
    showLoading();
    try {
      const res = await userApi.getAddress();
      res.data && formatData(res.data);
      res.data.address && dispatch(addAddressId(res.data.address.id))
    } catch (error) {}
    hideLoading();
  };

  useEffect(() => {
    fetchUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values) => {
    showLoading();
    try {
      const res = await userApi.changeAddress(values);
      res.status === 200 && toast.success('Cập nhật thông tin thành công!');
      if(res.data) {
        const data = res.data[0];
        data.id && dispatch(addAddressId(data.id))
        const newData = {
          province: data.province,
          district: data.district,
          ward: data.ward,
          street_name: data.street_name,
        }
        setAddress(newData);
      } 
    } catch (error) {}
    hideLoading();
  };

  return (
    <UserLocationForm address={address} info={info} onSubmit={handleSubmit} />
  );
}

export default withLoading(UserLocation);
