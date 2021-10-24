import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import productApi from 'api/productApi';
import BannerSlide from 'features/Home/components/BannerSlide';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductLoading from '../components/ProductLoading';
import ProductPromotion from '../components/ProductPromotion';
import SideBarProduct from '../components/SideBarProduct';
import ProductNotFound from './ProductNotFound';

const queryString = require('query-string');

function ProductPage() {
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
    };
  }, [location.search]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const result = await productApi.getProductList(queryParams);
        setProductList(result.data);
        setPagination(result.pagination);
      } catch (error) {}
      setLoading(false);
    })();
  }, [queryParams]);

  const iSNotFoundProduct = useMemo(() => {
    return productList.length <= 0;
  }, [productList]);

  const handleFilterChange = (values) => {
    const filters = {
      ...values,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

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

  return (
    <div className='product-page'>
      <div className='container'>
        <div className='product-page__content'>
          <div className='product-page__left'>
            <SideBarProduct />
            <ProductPromotion />
          </div>
          <div className='product-page__right'>
            <BannerSlide />
            <ProductFilter
              disabled={loading}
              params={queryParams}
              onChange={handleFilterChange}
            />
            {loading ? (
              <ProductLoading />
            ) : iSNotFoundProduct ? (
              <ProductNotFound />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
