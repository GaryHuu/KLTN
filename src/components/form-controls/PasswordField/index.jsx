import React from 'react';
import { Controller } from 'react-hook-form';

function PasswordField(props) {
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
            type='password'
            name={name}
          />
          {error && <span>{error?.message}</span>}
        </div>
      )}
    />
  );
}

export default PasswordField;
