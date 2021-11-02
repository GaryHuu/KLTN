import React from 'react';
import CreateProductForm from './CreateProductForm';

function CreateProduct(props) {
  const handleSubmit = (values) => {
    console.log(values);
  }
  return (
   <CreateProductForm onSubmit={handleSubmit}/>
  );
}

export default CreateProduct;