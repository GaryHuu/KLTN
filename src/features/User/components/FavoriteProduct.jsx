import withLoading from 'components/HOC/withLoading';
import ProductList from 'features/Product/components/ProductList';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import userApi from 'api/userApi';
import { useHistory, useLocation } from 'react-router-dom';
import ProductLoading from 'features/Product/components/ProductLoading';

const queryString = require('query-string');

function FavoriteProduct({ hideLoading, showLoading }) {
  const location = useLocation();
  const history = useHistory();
  const [productList, setProductList] = useState(null);
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

  useEffect(() => {
    (async function () {
      showLoading();
      setLoading(true);
      try {
        const rs = await userApi.getFavorites(queryParams);
        const data = rs.data.map((item) => item.product);
        setProductList(data);
        setPagination(rs.pagination);
      } catch (err) {
        console.log(err);
      }
      hideLoading();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className='favorite-product'>
      {loading ? (
        <Fragment>
          <ProductLoading />
        </Fragment>
      ) : (
        <Fragment>
          <ProductList data={productList} />
          <ReactPaginate
            forcePage={parseInt(queryParams.page) - 1}
            pageCount={pagination.totalPages}
            onPageChange={handlePageClick}
            activeClassName='active'
            containerClassName='product-pagi'
            nextLabel='>'
            previousLabel='<'
          />
        </Fragment>
      )}
    </div>
  );
}

export default withLoading(FavoriteProduct);
