import { Button } from 'antd';
import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import CreateProduct from './components/CreateProduct';

function ProductHeader(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='product__head'>
      <div />
      <div>
        <Button onClick={() => props.reload()} style={{ marginRight: '10px' }}>
          <i className='fas fa-sync'></i>
        </Button>
        <Button onClick={() => setOpenModal(true)} className='create-btn'>
          <i className='fas fa-plus'></i>
        </Button>
      </div>
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
            setOpenModal(false)
            props.reload()
          }}
        >
          X
        </div>
        <CreateProduct/>
      </Modal>
    </div>
  );
}

export default ProductHeader;
