import withLoading from 'components/HOC/withLoading';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactPaginate from 'react-paginate';
import OrderItem from './Order/OrderItem';
import { useLocation, useHistory } from 'react-router-dom';
import userApi from 'api/userApi';
import Skeleton from 'react-loading-skeleton';
const queryString = require('query-string');

function UserOrder({ hideLoading, showLoading }) {
  const location = useLocation();
  const history = useHistory();
  const [orderList, setOrderList] = useState(null);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
    };
  }, [location.search]);

  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    const filters = {
      ...queryParams,
      page: currentPage,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const formatData = useCallback((dataList) => {
    const newOrder = dataList.map((item) => {
      const newData = {
        id: item.id,
        dateOder: item.date_order.split(' '),
        product: item.order_details.reduce((acc, i, index) => {
          if (index === item.order_details.length - 1)
            return acc + i.product.name + ' (Số lượng: ' + i.product_quantity + ').';
          return acc + i.product.name + ' (Số lượng: ' + i.product_quantity + '), ';
        }, ''),
        address:
          item.address.street_name +
          ' ' +
          item.address.ward +
          ' ' +
          item.address.district +
          ' ' +
          item.address.province,
        price: item.total,
        status:
          item.status === 1
            ? 'Chờ xử lý'
            : item.status === 2
            ? 'Đang xử lý'
            : item.status === 3
            ? 'Đã giao hàng'
            : 'Đã hủy',
      };
      return newData;
    });
    setOrderList(newOrder);
  }, []);

  useEffect(() => {
    (async function () {
      showLoading();
      setLoading(true);
      try {
        const rs = await userApi.getOrders(queryParams);
        rs.data && formatData(rs.data);
        setPagination(rs.pagination);
      } catch (err) {
        // console.log(err);
      }
      hideLoading();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className='user-order'>
      <ul className='user-order__head'>
        <li className='code'>Mã Đơn Hàng</li>
        <li className='day'>Ngày Mua</li>
        <li className='order-product'>Sản Phẩm</li>
        <li className='order-address'>Địa Chỉ Giao Hàng</li>
        <li className='total-price'>Tổng Tiền</li>
        <li className='order-status'>Trạng Thái</li>
      </ul>
      {loading ? (
        <Fragment>
          <Skeleton
            style={{ margin: '10px 0 0 2.5%' }}
            height={50}
            width={'95%'}
            count={6}
          />
        </Fragment>
      ) : (
        <ul className='order-list'>
          {!loading &&
            orderList &&
            orderList.map((item) => <OrderItem order={item} key={item.id} />)}
        </ul>
      )}

      {loading ? (
        <Skeleton
          style={{ float: 'right', marginRight: '2.5%', marginTop: '20px' }}
          height={20}
          width={'10%'}
        />
      ) : (
        <ReactPaginate
          forcePage={parseInt(queryParams.page) - 1}
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
          activeClassName='active'
          containerClassName='product-pagi'
          nextLabel='>'
          previousLabel='<'
        />
      )}
    </div>
  );
}

export default withLoading(UserOrder);
