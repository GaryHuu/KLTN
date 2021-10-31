import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';
import Button from 'components/form-controls/Button';
import ReactTooltip from 'react-tooltip';

function UserLocationForm({ onSubmit, info, address }) {
  const schema = yup.object().shape({
    province: yup.string().required('Please enter your provice'),
    district: yup.string().required('Please enter your district'),
    ward: yup.string().required('Please enter your sub district'),
    street_name: yup.string().required('Please enter your location'),
  });

  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    address && form.reset(address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleSubmit = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='user-location'>
      <div data-tip data-for='name'>
        <InputField value={info && info.name} label='Họ Tên' />
        <ReactTooltip place='top' id='name' type='info' effect='solid'>
          <span style={{ display: 'block', textAlign: 'center' }}>
            Vui lòng vào Thông tin tài khoản <br /> để sửa Họ Tên
          </span>
        </ReactTooltip>
      </div>
      <div data-tip data-for='email'>
        <InputField value={info && info.email} label='Email' />
        <ReactTooltip place='top' id='email' type='info' effect='solid'>
          <span style={{ display: 'block', textAlign: 'center' }}>
            Vui lòng vào Thông tin tài khoản <br /> để sửa Email
          </span>
        </ReactTooltip>
      </div>
      <div data-tip data-for='phone'>
        <InputField value={info && info.phone} label='Số điện thoại' />
        <ReactTooltip place='top' id='phone' type='info' effect='solid'>
          <span style={{ display: 'block', textAlign: 'center' }}>
            Vui lòng vào Thông tin tài khoản <br /> để sửa Số điện thoại
          </span>
        </ReactTooltip>
      </div>
      <InputField name='province' form={form} label='Tỉnh' />
      <InputField name='district' form={form} label='Quận / Huyện' />
      <InputField name='ward' form={form} label='Phường / Xã' />
      <TextAreaField name='street_name' form={form} label='Địa Chỉ' />
      <Button type='submit' className='submit'>
        CẬP NHẬT THAY ĐỔI
      </Button>
    </form>
  );
}

export default UserLocationForm;
