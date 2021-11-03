import InputField from 'components/form-controls/InputField';
import React, { useRef, useState } from 'react';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import { DatePicker } from 'antd';
import { statusOrder } from 'constant';
import { Select } from 'antd';
import { useReactToPrint } from 'react-to-print';
const { Option } = Select;

const STATUS_ORDER = [
  {
    value: 1,
    title: statusOrder.PENDING,
  },
  {
    value: 2,
    title: statusOrder.PROCESSING,
  },
  {
    value: 3,
    title: statusOrder.COMPLETED,
  },
  {
    value: 4,
    title: statusOrder.DECLINE,
  },
];

function EditOrderForm(props) {
  const [orderState, setOrderState] = useState();
  const { data } = props;

  const typeCount = data.order_details.length;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: 12in ${12 + typeCount * 2}in }`,
  });

  function handleChange(value) {
    setOrderState(value);
  }
  const handleSubmitStatus = () => {
    if (!props.onSubmit) return;
    props.onSubmit(data.id, orderState);
  };
  if (!data) return;
  const productList = data.order_details.map((item, index) => {
    const product = item.product;
    const quantity = item.product_quantity;
    const discount =
      product.discount === 'No'
        ? 0
        : parseFloat(product.discount.slice(0, -1) / 100);
    const price = (product.price - product.price * discount).toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      }
    );
    return (
      <div className='item' key={index}>
        <div>
          <p>
            Tên sản phẩm:
            <span> {product.name}</span>
          </p>
          <p>
            Giá:
            <span> {price}</span>
          </p>
          <p>
            Số lượng:
            <span> {quantity}</span>
          </p>
        </div>
        <p>
          <img width='120px' src={product.images[0].url} alt='' />
        </p>
      </div>
    );
  });

  return (
    <div>
      <div ref={componentRef} className='edit-modal-content'>
        <h3>Chi tiết đơn hàng</h3>
        <div className='code'>
          <p>
            Mã đơn hàng:&nbsp;
            <span>{data.id}</span>
          </p>
          <Button onClick={handlePrint}>IN</Button>
        </div>
        <label>Thời gian đặt hàng: </label>
        <TimePicker
          defaultValue={moment(new Date(data.date_order * 1000))}
          size='large'
          disabled
        />
        <DatePicker
          disabled
          size='large'
          defaultValue={moment(new Date(data.date_order * 1000), 'DD/MM/YYYY')}
          format={'DD/MM/YYYY'}
        />
        <InputField label='Họ tên' name='name' value={data.user.name} />
        <InputField label='Số điện thoại' name='name' value={data.user.phone} />
        <InputField label='Email' name='name' value={data.user.email} />
        <InputField
          label='Địa chỉ'
          name='name'
          value={data.user.address.street_name}
        />
        <InputField
          label='Xã/Phường'
          name='name'
          value={data.user.address.ward}
        />
        <InputField
          label='Quận/Huyện'
          name='name'
          value={data.user.address.district}
        />
        <InputField
          label='Tỉnh/TP'
          name='name'
          value={data.user.address.province}
        />
        {productList}
        <div>
          <p className='item'>
            Tổng số: &nbsp;
            <span>
              {data.order_details.reduce(
                (acc, item) => acc + item.product_quantity,
                0
              )}
            </span>
            &nbsp;sản phẩm
          </p>
        </div>
        <div>
          <p className='item total'>
            Tổng số tiền: &nbsp;
            <span>
              {data.total.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </p>
        </div>
      </div>
      <div style={{
        padding: '10px 30px',
        borderTop: '1px solid #ccc'
      }}>
        <label>Trạng thái đơn hàng: </label>
        <Select
          defaultValue={data.status}
          style={{ minWidth: '120px' }}
          size='large'
          onChange={handleChange}
        >
          {STATUS_ORDER.map((item) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            );
          })}
        </Select>
        <Button
          style={{
            marginLeft: '10px',
          }}
          size='large'
          onClick={handleSubmitStatus}
        >
          Thay đổi
        </Button>
      </div>
    </div>
  );
}

export default EditOrderForm;
