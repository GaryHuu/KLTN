import React from 'react';

const FILTERLIST = [
  {
    id: 1,
    title: 'Hàng Mới',
  },
  {
    id: 2,
    title: 'Bán Chạy',
  },
  {
    id: 3,
    title: 'Giá Thấp',
  },
  {
    id: 4,
    title: 'Giá Cao',
  },
  {
    id: 5,
    title: 'Giảm Giá',
  },
  {
    id: 6,
    title: 'Khuyến Mãi',
    isActive: true,
  },
];

function ProductFilter(props) {
  return (
    <div className='product-filter'>
      <span>Ưu tiên xem: &nbsp;</span>
      <ul>
        {FILTERLIST.map((filter) => (
          <li className={filter.isActive && 'active'} key={filter.id}>
            {filter.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductFilter;
