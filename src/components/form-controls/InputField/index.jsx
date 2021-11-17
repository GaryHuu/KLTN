import React from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const {
    form,
    name,
    label,
    disable,
    placeholder,
    type = 'text',
    value,
    className,
  } = props;

  // Type Read Only
  if (!form)
    return (
      <div className='input-field'>
        <label>{label}</label>
        <input
          disabled={true}
          value={value}
          type={type}
        />
      </div>
    );

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
          <input
            disabled={disable}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            name={name}
            className={className || ''}
          />
          {invalid && <span>{error?.message}</span>}
        </div>
      )}
    />
  );
}

export default InputField;
