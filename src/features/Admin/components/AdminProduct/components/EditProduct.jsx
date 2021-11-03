import React from 'react';
import { Button } from 'antd';
import { Fragment } from 'react';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import EditProductContainer from './EditProductContainer';

function EditProduct(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Fragment>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        style={{ display: 'block', margin: '0 auto' }}
      >
        <i className='fas fa-edit'></i>
      </Button>
      <Modal
        isOpen={openModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            zIndex: '1000',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.53)',
            cursor: 'poiter',
          },
          content: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: 'rgb(255, 255, 255)',
            overflow: 'unset',
            borderRadius: '4px',
            outline: 'none',
            padding: '0',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <div
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            padding: '20px',
            position: 'absolute',
            top: '-15px',
            fontSize: '30px',
            right: '0',
            color: '#01adab',
          }}
          onClick={() => {
            setOpenModal(false);
            props.onEdit();
          }}
        >
          X
        </div>
        <EditProductContainer data={props.data}/>
      </Modal>
    </Fragment>
  );
}

export default EditProduct;
