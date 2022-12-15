import { Controller } from 'react-hook-form';
import { Input } from 'antd';

import classes from './ControlledInput.module.css';

const ControlledInput = ({ control, type, name, placeholder, defaultValue = '', label = null }) => {
  return (
    <label className={classes.label}>
      {label}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input placeholder={placeholder} {...field} status={error ? 'error' : null} type={type} />
            {error && <p className={classes.error}>{error.message}</p>}
          </>
        )}
      />
    </label>
  );
};

export { ControlledInput };
