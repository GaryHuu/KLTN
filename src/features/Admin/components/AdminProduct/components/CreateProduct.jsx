import React from 'react';
import CreateProductForm from './CreateProductForm';
import adminApi from 'api/adminApi';
import withLoading from 'components/HOC/withLoading';
import { toast } from 'react-toastify';

function CreateProduct(props) {
  const {showLoading, hideLoading} = props;
  const handleSubmit = async (formData) => {
    showLoading('top');
    try {
      const res = await adminApi.addProduct(formData);
      if(res.status === 200 && res.success === true){
        toast.success('Thêm sản phẩm thành công!');
      }
    } catch (err) {
      toast.error('Error');
    }
    hideLoading();
  };
  return <CreateProductForm onSubmit={handleSubmit} />;
}

export default withLoading(CreateProduct);
