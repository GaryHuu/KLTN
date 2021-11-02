import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';

function CreateProductForm(props) {
  const { onSubmit } = props;
  const schema = yup.object().shape({
    name: yup.string().required('Please enter product name'),
    price: yup.number().required('Please enter product price'),
    content: yup.string().required('Please enter product content'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      price: null,
      content: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <div className='create-product'>
      <h3>Tạo mới sản phẩm</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          placeholder='Phong tê thấp Bà Giằng'
          name='name'
          form={form}
          label='Nhập tên sản phẩm'
        />
        <InputField
          placeholder='230000'
          name='price'
          form={form}
          label='Nhập giá sản phẩm'
        />
        <TextAreaField
          placeholder='Công Dụng: Phong tê thấp Bà Giằng ...'
          name='content'
          form={form}
          label='Nhập nội dung sản phẩm'
        />
      </form>
    </div>
  );
}

export default CreateProductForm;
