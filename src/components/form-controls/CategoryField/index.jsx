import React from 'react'
import { Controller } from 'react-hook-form'

const CATEGORY_PRODUCT = [
  {
    id: 1,
    title: 'Tủ thuốc gia đình',
  },
  {
    id: 2,
    title: 'Thuốc không kê toa',
  },
  {
    id: 3,
    title: 'Thực phẩm chức năng',
  },
  {
    id: 4,
    title: 'Dụng cụ y khoa',
  },
  {
    id: 5,
    title: 'Mỹ phẩm',
  },
  {
    id: 6,
    title: 'Mẹ & bé',
  },
]

function CategoryField(props) {
  const { form, name, label, disable, value } = props
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
  )
}

export default CategoryField
