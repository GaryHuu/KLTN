import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import categoryApi from 'api/categoryApi';
import { useHistory, useLocation } from 'react-router-dom';

const queryString = require('query-string');

function SideBarProduct(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryActive, setCategoryActive] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await categoryApi.getCategories();
        setCategoryList(data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    const currentCategoryID =
      parseInt(queryString.parse(location.search).category) || 0;
    setCategoryActive(currentCategoryID);
  }, [location.search]);

  const handleCategoryClick = (id) => {
    if(location.pathname + location.search === `/product?category=${id}`) return;
    history.push({
      pathname: '/product',
      search: `?category=${id}`,
    });
  };
  const handleAll = () => {
    if(location.pathname + location.search === '/product') return;
    history.push('/product');
  };
  
  return (
    <div className='side-bar-product'>
      <h5>Danh Mục Sản Phẩm</h5>
      <ul>
        <div
          onClick={handleAll}
          className={
            categoryActive === 0 ? 'category-item active' : 'category-item'
          }
        >
          Tất cả
        </div>
        {categoryList.map((item) => (
          <div
            onClick={() => handleCategoryClick(item.id)}
            key={item.id}
            to={`/product`}
            className={
              categoryActive === item.id
                ? 'category-item active'
                : 'category-item'
            }
          >
            {item.name}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideBarProduct;
