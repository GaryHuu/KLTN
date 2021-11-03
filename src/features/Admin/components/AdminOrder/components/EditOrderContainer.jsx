import React from 'react';
import EditOrderForm from './EditOrderForm';
import adminApi from 'api/adminApi';
import { toast } from 'react-toastify';
import withLoading from 'components/HOC/withLoading';

function EditOrderContainer(props) {
  const handleSubmit = async (id, orderStatus) => {
    console.log({ id, orderStatus });
    props.showLoading('top');
    try {
      const res = await adminApi.editStatusOrder(id, {
        status: orderStatus,
      });
      if (res.status === 200 && res.success) {
        toast.success('Thay đổi thành công');
      }
    } catch (error) {
      toast.error('Error');
    } finally {
      props.hideLoading();
    }
  };
  return <EditOrderForm onSubmit={handleSubmit} data={props.data} />;
}

export default withLoading(EditOrderContainer);
