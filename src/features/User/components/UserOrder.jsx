import withLoading from 'components/HOC/withLoading';
import React from 'react';
import ReactPaginate from 'react-paginate';
import OrderItem from './Order/OrderItem';

function UserOrder({ hideLoading, showLoading }) {
  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    console.log(currentPage);
  };

  return (
    <div className='user-order'>
      <ul className='user-order__head'>
        <li className='code'>Mã Đơn Hàng</li>
        <li className='day'>Ngày Mua</li>
        <li className='order-product'>Sản Phẩm</li>
        <li className='total-price'>Tổng Tiền</li>
        <li className='order-status'>Trạng Thái</li>
      </ul>
      <ul className='order-list'>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </ul>
      <ReactPaginate
        initialPage={0}
        pageCount={10}
        onPageChange={handlePageClick}
        activeClassName='active'
        containerClassName='product-pagi'
        nextLabel='>'
        previousLabel='<'
      />
    </div>
  );
}

export default withLoading(UserOrder);
