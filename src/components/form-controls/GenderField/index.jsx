import React from 'react';
import { Controller } from 'react-hook-form';

function GenderField(props) {
  const { form, name, label, disable } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, onClick, value, name },
        fieldState: { invalid, error },
      }) => {
        return (
          <div className={`input-field gender ${error ? 'error' : ''}`}>
            <label>{label}</label>
            <div className='group'>
              <input
                id='user-sex-male'
                value={1}
                // eslint-disable-next-line
                checked={value == 1}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type='radio'
                name={name}
              />
              <label htmlFor='user-sex-male'>Nam</label>
              <input
                id='user-sex-female'
                value={0}
                // eslint-disable-next-line
                checked={value == 0}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type='radio'
                name={name}
              />
              <label htmlFor='user-sex-female'>Nữ</label>
              {/* <input
                id='user-sex-other'
                value='other'
                defaultChecked={value === 'other'}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type='radio'
                name={name}
              />
              <label htmlFor='user-sex-other'>Khác</label> */}
            </div>

            {invalid && <span>{error?.message}</span>}
          </div>
        );
      }}
    />
  );
}

export default GenderField;
