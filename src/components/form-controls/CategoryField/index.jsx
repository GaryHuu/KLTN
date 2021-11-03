import React from 'react';
import { Controller } from 'react-hook-form';

const CATEGORY_PRODUCT = [
  {
    id: 1,
    title: 'Thuốc không kê toa',
  },
  {
    id: 2,
    title: 'Thực phẩm chức năng',
  },
  {
    id: 3,
    title: 'Dụng cụ y khoa',
  },
  {
    id: 4,
    title: 'Mỹ phẩm',
  },
  {
    id: 5,
    title: 'Mẹ & bé',
  },
];

function CategoryField(props) {
  const { form, name, label, disable, value } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <div className={error ? 'input-field error' : 'input-field'}>
          <label>{label}</label>
          <select
            style={{
              padding: '5px 10px',
              borderRadius: '7px',
              cursor: 'pointer',
              outline: 'none',
            }}
            disabled={disable}
            name={name}
            onChange={onChange}
          >
            {CATEGORY_PRODUCT.map((item) => (
              <option
                style={{
                  cursor: 'pointer',
                }}
                key={item.id}
                value={item.id}
                selected={value === item.id}
              >
                {item.title}
              </option>
            ))}
          </select>
          {invalid && <span>{error?.message}</span>}
        </div>
      )}
    />
  );
}

export default CategoryField;
