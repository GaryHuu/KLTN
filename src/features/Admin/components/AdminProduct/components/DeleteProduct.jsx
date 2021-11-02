import { Button } from 'antd';
import adminApi from 'api/adminApi';
import React from 'react';
import { toast } from 'react-toastify';

function DeleteProduct({ id, onDelete }) {
  const handleDelete = async () => {
    console.log(id);
    try {
      const res = await adminApi.deleteProduct(id);
      if(res.status === 200 && res.success === true){
        onDelete();
        toast.success('Xóa thành công!');
      }
    } catch (error) {}
  };
  return <Button style={{display: 'block', margin: '10px auto 0'}} onClick={handleDelete}>
    <i className="fas fa-trash-alt"></i>
  </Button>;
}

export default DeleteProduct;
