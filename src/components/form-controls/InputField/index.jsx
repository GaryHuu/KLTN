import React from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { form, name, label, disable, placeholder } = props;
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
            type='text'
            name={name}
          />
          {invalid && <span>{error?.message}</span>}
        </div>
      )}
    />
  );
}

export default InputField;
